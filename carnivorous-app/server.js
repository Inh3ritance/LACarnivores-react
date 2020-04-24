const app = require("express")();
const stripe = require("stripe")("sk_test_NEQdDYQEGCNzJ01s8oW3njZq00eNYSwGJo");

app.use(require("body-parser").text());

app.post("/charge", async (req, res) => {
    try {
        //Update with cart
        let { status } = await stripe.charges.create({
            amount: 2000,
            currency: "usd",
            description: "An example charge",
            source: req.body
        });

        res.json({ status });
    } catch (err) {
        console.log(err);
        res.status(500).end();
    }
});

app.listen(9000, () => console.log("Listening on port 9000"));