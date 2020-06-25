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