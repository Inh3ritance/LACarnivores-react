// PRODUCT MANAGEMENT 


async function createSKU() {
    await stripe.skus.update(
        'sku_HWiSMoOAzZ7dkH',
        {metadata: {order_id: '6735'}},
        function(err, sku) {
          // asynchronously called
        }
      );
};

async function getSKU() {
    await stripe.skus.list( 
        function (err, sku) {
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
        function (err, product) {
            console.log(err);
        }
    );
}

async function updateProduct(){
    await stripe.products.update(
        '',
        {images: []},
        function(err, product) {
          // asynchronously called
        }
      );
}