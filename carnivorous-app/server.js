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
    /*
    let data = {
        name = req.body.name,
        email = req.body.email,
        city = req.body.city,
        address = req.body.line1,
        state = req.body.state,
    
        shippingCity = req.body.shippingCity,
        shippingAddy = req.body.shippingAddy,
        shippingState = req.body.shippingState,
    }*/

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

    // Check if the customer email already in our Stripe customer database


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


function listAllCustomers(email) {
    console.log("");
    let id = 'null';
    let condition = false;
    // List all customers from Stripe customer database 
    // pass in email parameter to find if the customer exists
    stripe.customers.list(
        {
            limit: 100
        }).autoPagingEach((customer) => {
            console.log("Customer name: ", customer.name);
            console.log("Customer email: ", customer.email);
            console.log("Customer uid: ", customer.id);
            console.log("");
            if (customer.email == email) {
                console.log(true);
                console.log("Matching customer");
                console.log("Customer name: ", customer.name);
                console.log("Customer email: ", customer.email);
                console.log("Customer uid: " + customer.id + "\n");
                custo = customer.id;
                condi = true;
                // If true then we use the customers email and cus_id
            }
            else {
                console.log(false);
                condition = false;
            }

        });
    return [condition, id];
};

console.log("Calling the function");
console.log(listAllCustomers("JamesKingston@email.com"));

function display(data) {
    console.log("Body name: ", name);
    console.log("Body email: ", email);
    console.log("Body city: ", city);
    console.log("Body address: ", address);
    console.log("Body state: ", state);
}

const port = process.env.PORT || 9000;

app.listen(port, () => console.log('Server is running...\n'));