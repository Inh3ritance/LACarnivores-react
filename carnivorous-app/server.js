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
        //createOrder(data, existingCustomers.data[0].id);
    } else {
        stripe.customers.create({
            name: data.personal_info.name,
            email: data.personal_info.email,
            address: data.billing_address,
            phone: data.personal_info.phone,
        }, (err, customer) => {
            createSource(data, customer.id);
            //createOrder(data, customer.id);
        }).catch(e => {
            console.log(e);
        });

    } // end else
} // end CreateCustomer

async function createSource(data, customerID) {
    await stripe.customers.createSource(
        customerID,
        {
            source: 'tok_visa',
        },
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
    console.log("Customer ID", customerID);
    stripe.orders.create({
        currency: 'usd',
        customer: customerID,
        email: data.personal_info.email,
        items: [
            {
                type: 'sku',
                parent: 'sku_HWLoYYQh0wGeSR',
                quantity: 1,
            },
        ],
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
    }).then(function (result) {
        console.log(result);
        payOrder(result.id, customerID);
    });

}

function payOrder(orderID, customerID) {
    stripe.orders.pay(orderID,
        { customer: customerID, }
        , function (err, order) {
            console.log(err);
        });
}

async function createSKU() {
    stripe.skus.create(
        {
            attributes: {
                name: "Venus Fly Trap Test"
            },
            price: 1499,
            currency: 'usd',
            inventory: { type: 'finite', quantity: 5 },
            product: 'prod_HWLn9VclyOyL0O'
        },
        function (err, sku) {
            console.log(sku);
        }
    )
};

function getSKU() {
    stripe.skus.retrieve(
        'sku_HWLoYYQh0wGeSR',
        function (err, sku) {
            // asynchronously called
            console.log(sku);
        }
    );
}

function createProduct() {
    stripe.products.create(
        {
            name: 'Venus Fly Trap Test',
            type: "good",
            attributes: ["name"],
        },
        function (err, product) {
            console.log(err);
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
        }
    }
    console.log(data);
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