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

    console.log("Body name: ", name);
    console.log("Body email: ", email);
    stripe.customers.create({
        name: name,
        email: email,
        },
    (err, customer) => {
    stripe.customers.createSource(
        customer.id,
        {
            source: 'tok_visa',
        },
    (err, card) => {
            stripe.charges.create({
                amount:1000,
                currency: 'usd',
                customer: customer.id,
                receipt_email: req.body.email,
                description: "test",
                metadata: {integration_check: 'accept_a_payment'},
            },
            {
                idempotencyKey
            }).catch(e=>{
                throw(e)
            })
          }
        ).catch(e=>{
            throw(e)
        });
    }).catch(e=>{
        throw(e)
    });
});

app.post('/createCustomer', (req, res) => {
    let name = req.body.name;
    console.log("Creating customer with name ", name);
    try {
        stripe.customers.create(
            {
                name: req.body.name,
                email: req.body.email,
            },
        )
    } catch (err) {
        console.log(err);
        res.status(500).end();
    }
});

app.post("/create-payment-intent", async (req, res) => {
    const { items, currency } = req.body;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: currency
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
        clientSecret: paymentIntent.client_secret
    });
});


const port = process.env.PORT || 9000;

app.listen(port, () => console.log('Server is running...'));