const app = require("express")();
const stripe = require("stripe")("sk_test_NEQdDYQEGCNzJ01s8oW3njZq00eNYSwGJo");
const bodyParser = require('body-parser');
const cors = require('cors')({ origin: true });
const { uuid } = require('uuidv4');
app.use(cors);
// parse application/x-www-form-urlencoded
app.use(bodyParser.json());

// Just Testing out API with this GET method.
app.get("/charge", (req, res) => {
    res.send("Hello The GET request worked if u see this");
});

app.post("/charge", async (req, res) => {
    const idempotencyKey = uuid(); // Prevent charging twice
    
    let name = req.body.name;
    let email = req.body.email;
    let city = req.body.city;
    let address = req.body.line1;
    let state = req.body.state;

    let shippingCity = req.body.shippingCity;
    let shippingAddy = req.body.shippingAddy;
    let shippingState = req.body.shippingState;

    console.log("Body name: ", name);
    console.log("Body email: ", email);
    console.log("Body city: ", city);
    console.log("Body address: ", address);
    console.log("Body state: ", state);

    stripe.customers.create({
        name: name,
        email: email,
        address: {
            city: city,
            line1: address,
            state: state,
            
        },
        phone: 8008008888,

    },
        (err, customer) => {
            stripe.customers.createSource(
                customer.id,
                {
                    source: 'tok_visa',
                },
                (err, card) => {
                    stripe.charges.create({
                        amount: 1000,
                        currency: 'usd',
                        customer: customer.id,
                        receipt_email: req.body.email,
                        description: "test",
                        metadata: { integration_check: 'accept_a_payment' },
                        shipping: {
                            address: {
                                line1: shippingAddy,
                                city: shippingCity,
                                state: shippingState,
                            },
                            name: name,
                            carrier: 'USPS',
                            phone: '8008888000',
                        },
                    },
                        {
                            idempotencyKey
                        }).catch(e => {
                            throw (e)
                        })
                }
            ).catch(e => {
                throw (e)
            });
        }).catch(e => {
            throw (e)
        });
});

app.get("/list", async (req, res) => {
    stripe.customers.list(
        {limit: 100},
    )
});

const port = process.env.PORT || 9000;

app.listen(port, () => console.log('Server is running...'));