const app = require("express")();
const stripe = require("stripe")("sk_test_NEQdDYQEGCNzJ01s8oW3njZq00eNYSwGJo");
const bodyParser = require('body-parser');
const cors = require('cors')({ origin: true });
const { uuid } = require('uuidv4');
app.use(cors);
// parse application/x-www-form-urlencoded
app.use(bodyParser.json());

// Creates Customer => creates source => creates charge
function CreateCustomer(data,idempotencyKey){
    stripe.customers.create({
        name: data.personal_info.name,
        email: data.personal_info.email,
        address: data.billing_address,
        phone: data.personal_info.phone,
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
                        receipt_email: data.personal_info.email,
                        description: "test",
                        metadata: { integration_check: 'accept_a_payment' },
                        shipping: {
                            address: data.shipping_address,
                            name: data.personal_info.name,
                            carrier: 'USPS',
                            phone: data.personal_info.phone,
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
}

app.post("/charge", async (req, res) => {
    const idempotencyKey = uuid(); // Prevent charging twice
    let data = {
        personal_info:{
            name: req.body.name,
            email: req.body.email,
            phone: '8008008888',
        },
        billing_address:{
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
    // Check if the customer email already in our Stripe customer database
    
    //Create Customer is no email is linked
    CreateCustomer(data,idempotencyKey);    
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
            if (customer.email === email) {
                console.log(true);
                console.log("Matching customer");
                console.log("Customer name: ", customer.name);
                console.log("Customer email: ", customer.email);
                console.log("Customer uid: " + customer.id + "\n");
                // If true then we use the customers email and cus_id
            }
            else {
                console.log(false);
                condition = false;
            }

        });
    return [condition, id];
};

// Just Testing out API with this GET method.
app.get("/charge", (req, res) => {
    res.send("Hello The GET request worked if u see this");
});

const port = process.env.PORT || 9000;

app.listen(port, () => console.log('Server is running...\n'));