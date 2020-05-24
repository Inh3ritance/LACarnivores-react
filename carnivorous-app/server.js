const app = require("express")();
const stripe = require("stripe")("sk_test_NEQdDYQEGCNzJ01s8oW3njZq00eNYSwGJo");
const bodyParser = require('body-parser');
const cors = require('cors')({origin: true});
const { uuid } = require('uuidv4');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(cors);


// Just Testing out API with this GET method.
app.get("/charge", (req, res) => {
    res.send("Hello The GET request worked if u see this");
});

app.post("/charge", async (req, res) => {
    try {
        const idempotencyKey = uuid(); // Prevent charging twice
        //Update with cart
        let { status } = await stripe.charges.create({
            amount: 2000,
            currency: "usd",
            description: "An example charge",
            metadata: { integration_check: 'accept_a_payment' },
            source: req.body,
        },{
            idempotencyKey
        });
        res.json({ status });
    } catch (err) {
        console.log(err);
        res.status(500).end();
    }
});

app.post('/createCustomer', (req, res) => {
    let name = req.body.name;
    console.log(name);
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

app.listen(9000, () => console.log("Listening on port 9000"));