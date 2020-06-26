const app = require("express")();
const stripe = require("stripe")("sk_test_NEQdDYQEGCNzJ01s8oW3njZq00eNYSwGJo");
const bodyParser = require('body-parser');
const cors = require('cors')({ origin: true });
const { uuid } = require('uuidv4');
app.use(cors);
// parse application/x-www-form-urlencoded
app.use(bodyParser.json());

// Creates Customer => creates source => creates charge
async function CreateCustomer(data) {
    let existingCustomers = await stripe.customers.list({ email: data.personal_info.email });
    if (existingCustomers.data.length) {
        console.log("Not creating new customer");
        /*Use existing customerUID and pass in rest of data to create charge*/
        console.log(existingCustomers.data[0].id);
        updateSource(data, existingCustomers.data[0].id);
    } else {
        stripe.customers.create({
            name: data.personal_info.name,
            email: data.personal_info.email,
            address: data.billing_address,
            phone: data.personal_info.phone,
        }, (err, customer) => {
            createSource(data, customer.id);
        }).catch(e => {
            console.log(e);
        });

    } // end else
} // end CreateCustomer

async function createSource(data, customerID) {
    await stripe.customers.createSource(
        customerID,
        {
            source: data.card.token.id
        },
        (err, card) => {
            //console.log("UPDATE SOURCE CARD: Cust ID", card.customer);
            //console.log("UPDATE SOURCE CARD: Card ID", card.id);
            //console.log("Errors: ", err);
            updateCard(data, card.customer, card.id);
            createOrder(data, customerID);
        }).catch(e => {
            console.log(e);
        })
};

async function updateCard(data, customerID, cardID) {
    await stripe.customers.updateSource(
        customerID,
        cardID,
        {
            name: data.personal_info.name,
            address_city: data.billing_address.city,
            address_country: "United States",
            address_line1: data.billing_address.line1,
            address_state: data.billing_address.state,

        },
    ).then((card) => {
        //console.log("Card", card);
    }).catch((err) => {
        console.log(err);
    })
}


async function updateSource(data, customerID) {
    await stripe.customers.update(
        customerID,
        { source: data.card.token.id },
        (err, card) => {
            //console.log("UPDATE SOURCE CARD: Cust ID", card.id);
            //console.log("UPDATE SOURCE CARD: Card ID", card.default_source);
            updateCard(data, card.id, card.default_source);
            createOrder(data, customerID);
        }).catch(err => {
            console.log(err);
        })
};

function getSku(productID) {
    return stripe.skus.list({
        product: productID
    }).then((result) => {
        //console.log(result.data);
        return Promise.resolve(result.data[0].id);
    });
};

async function updateProductQuantity(itemID, cartQuantity) {
    // update product metadata quantity when user purchases item
    await stripe.products.retrieve(
        itemID,
        function (err, product) {
            console.log("Product Quantity", product.metadata.quantity);
            stripe.products.update(
                itemID,
                { metadata: { quantity: (product.metadata.quantity - cartQuantity.toString()) } },
                function (err, product) {
                    //console.log("ERRORS", err);
                }
            );
        }
    );
}

async function createOrder(data, customerID) {
    // in parent put the sku number
    let cart = [];
    for (var key in data.cart) {
        var item = data.cart[key];
        updateProductQuantity(item.id,item.quantity);
        cart.push({ type: 'sku', parent: await getSku(item.id), quantity: item.quantity, currency: 'usd', description: item.name });
    }

    stripe.orders.create({
        currency: 'usd',
        customer: customerID,
        email: data.personal_info.email,
        items: cart,
        shipping: {
            name: data.personal_info.name,
            address: {
                line1: data.shipping_address.line1,
                city: data.shipping_address.city,
                state: data.shipping_address.state,
                postal_code: '94111',
                country: 'US',
            },
        },
    }).then((result) => {
        //console.log(result);
        payOrder(result.id, customerID, data);
    });

}

function payOrder(orderID, customerID, data) {
    stripe.orders.pay(orderID,
        { customer: customerID },
        (err, order) => {
            //console.log(err);
            updateOrder(order.charge, data.cart);
        });
}

function updateOrder(chargeID, cartInfo) {
    //loop thru and add to reciept description
    let reciept = '';
    for (var key in cartInfo) {
        var item = cartInfo[key];
        reciept += item.name + " " + item.quantity + "x $" + item.price + "\n";
    }

    stripe.charges.update(
        chargeID,
        { description: reciept },
        (err, charge) => {
            // asynchronously called
        }
    );
}

// Get all products
app.get("/products", async (request, response) => {
    stripe.products.list(
        { active: true },
        (err, list) => {
            response.json(list);
        }
    )
});

app.get("/skus", async (request, response) => {
    stripe.skus.list(
        { active: true },
        (err, skus) => {
            response.json(skus);
            console.log(skus);
        }
    );
});

app.post("/charge", async (req, res) => {
    let data = {
        personal_info: {
            name: req.body.name,
            email: req.body.email,
            phone: '8008008888',
        },
        billing_address: {
            city: req.body.city,
            line1: req.body.line1,
            state: req.body.state,
        },
        shipping_address: {
            city: req.body.shippingCity,
            line1: req.body.shippingAddy,
            state: req.body.shippingState,
        },
        cart: req.body.cart,
        card: req.body.card,
    }
    data.card.token.card.address_city = req.body.city;
    data.card.token.card.address_line1 = req.body.line1;
    data.card.token.card.address_state = req.body.state;
    data.card.token.card.name = req.body.name;
     //console.log("DATA", data.card);
    // Check if the customer email already in our Stripe customer database, Create Customer if no email is linked
    CreateCustomer(data);
    res.send("Creating Charge");
});

// Just Testing out API with this GET method.
app.get("/charge", (req, res) => {
    res.send("Hello The GET request worked if u see this");
});

app.get("/prices", async (req, res) => {
    stripe.prices.list(
        { product: req.query.id },
        (err, price) => {
            // asynchronously called
            console.log(price.data);
            res.send(price.data);
        }
    );
});

const port = process.env.PORT || 9000;

app.listen(port, () => console.log('Server is running...\n'));