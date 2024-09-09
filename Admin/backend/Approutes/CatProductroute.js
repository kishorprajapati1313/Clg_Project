const express = require('express');
const router = express.Router();
const productModel = require('../Models/Product.js');

router.get('/product', async (req, res) => {
    try {
        const allproduct = await productModel.find();
        const productsWithBase64 = allproduct.map((product) => ({
          ...product.toObject(),
          img1: `data:image/png;base64, ${product.img1}`,
        }));
        res.json(productsWithBase64);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
});

router.get('/product_name', async (req, res) => {
  try {
    // Fetch all products from the database
    const allProducts = await productModel.find();

    // Extract only the product names from the fetched products
    const productNames = allProducts.map(product => product.product_name);

    // Send the product names as the response
    res.json(productNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get('/category/:cat', async (req, res) => {
  const catparams = req.params.cat;

  try {
    const product = await productModel.find({ cat: catparams });

    // console.log(product);

    const baseconver = product.map((product) => ({
      ...product.toObject(),
      img1: `data:image/png;base64, ${product.img1}`,
    }));
    res.json(baseconver);

  } catch (error) {
    res.status(500).json({ error: "internal error" });
  }
});



module.exports = router;
