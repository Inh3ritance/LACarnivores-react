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
        createSource(data, existingCustomers.data[0].id);
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
        customerID,{ source: 'tok_visa' },
        (err, card) => {
            createOrder(data, customerID);
        }).catch(e => {
            console.log(e);
        })
};

async function createCharge(customerID, data) {
    const idempotencyKey = uuid(); // Prevent charging twice
    await stripe.charges.create({
        amount: 1000, // Update amount
        currency: 'usd',
        customer: customerID,
        receipt_email: data.personal_info.email,
        description: "test",
        metadata: { integration_check: 'accept_a_payment' },
        shipping: {
            address: data.shipping_address,
            name: data.personal_info.name,
            carrier: 'USPS',
            phone: data.personal_info.phone,
        },
        //Need to specify Card from data
        payment_method_details: data.card,
        ip: "123.128.1.25", // Figure out how to get IP adress
    },
        {
            idempotencyKey
        }).catch(e => {
            throw (e)
        })
};

async function createOrder(data, customerID) {
    let cart = [];
    for(var key in data.cart){
        var item = data.cart[key];
        cart.push({type: 'sku', parent:"", quantity: item.quantity, currency: 'usd', description: item.name});
    }

    console.log("Customer ID", customerID);
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
            //console.log(order);
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

app.get("/skus", async(request, response) => {
    stripe.skus.list(
        {active: true },
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
    }
    // Check if the customer email already in our Stripe customer database, Create Customer if no email is linked
    CreateCustomer(data);
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