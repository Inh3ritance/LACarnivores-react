// PRODUCT MANAGEMENT 


async function createSKU() {
    await stripe.skus.update(
        'sku_HWiSMoOAzZ7dkH',
        {metadata: {order_id: '6735'}},
        (err, sku)=> {
          // asynchronously called
        }
      );
};

async function getSKU() {
    await stripe.skus.list( 
        (err, sku) => {
            // asynchronously called
            console.log(sku);
        }
    );
}

async function createProduct() {
    await stripe.products.create(
        {
            name: 'Venus Fly Trap Test',
            type: "good",
            attributes: ["name"],
        },
        (err, product) => {
            console.log(err);
        }
    );
}

async function updateProduct(){
    await stripe.products.update(
        '',
        {images: []},
        (err, product) => {
          // asynchronously called
        }
      );
}

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