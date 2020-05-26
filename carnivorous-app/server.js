const app = require("express")();
const stripe = require("stripe")("sk_test_NEQdDYQEGCNzJ01s8oW3njZq00eNYSwGJo");
const bodyParser = require('body-parser');
const cors = require('cors')({origin: true});
const { uuid } = require('uuidv4');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(cors);


// Just Testing out API with this GET method.
app.get("/charge", (req, res) => {
    res.send("Hello The GET request worked if u see this");
});

app.post("/charge", async (req, res) => {
    const {product, token} = req.body;
    console.log(product,token);
    const idempotencyKey = uuid(); // Prevent charging twice
    return stripe.customer.create({
        name: req.body.email,
        email: req.body.email
    }).then(customer => {
        stripe.charges.create({
            amount:1000,
            currency: 'usd',
            customer: customer.id,
            reciept_email: req.body.email,
            description: "test"
        },
        {
            idempotencyKey
        })
    }).then(result =>{
        res.status(200).json(result);
    }).catch(err =>{
        console.log(err);
    })
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

const port = process.env.PORT || 9000;

app.listen(port, () => console.log("Server is running..."));