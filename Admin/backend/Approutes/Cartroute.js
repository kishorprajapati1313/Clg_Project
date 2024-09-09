const express = require("express");
const router = express.Router();
const cartmodel = require("../Models/Cart");
const productmodel = require("../Models/Product");
const usermodel = require("../Models/userlogin");

router.post("/addtocart", async (req, res) => {
    const { userid, productid } = req.body;

    try {

        const checkuser = await usermodel.findOne({ _id: userid });
        const checkproduct = await productmodel.findOne({ _id: productid });

        if (!checkuser || !checkproduct) {
            return res.status(500).json({ message: "Product is not added to cart" });
        }

        // Check if the product is already in the cart
        const existingCartItem = await cartmodel.findOne({
            userid: checkuser._id,
            productid: checkproduct._id,
        });

        if (existingCartItem) {
            return res.status(400).json({ error: "Product is already in the cart" });
        }

        // Add the product to the cart
        await cartmodel.create({ ...req.body });

        res.status(200).json({ message: "Product added to cart successfully" });
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).json({ error: "Product is not added to cart", error: error.message });
    }
});

router.get("/cartlist/:userid", async (req, res) => {
    const useridparams = req.params.userid;
    try {
        const cartItems = await cartmodel.find({ userid: useridparams });

        if (!cartItems || cartItems.length === 0) {
            return res.status(404).json({ message: "No cart items found for the user" });
        }

        const productDetailPromises = cartItems.map(async (cartItem) => {
            const product = await productmodel.findById(cartItem.productid);
            product.img1 = `data:image/png;base64, ${product.img1}`;

            return product;
        });

        // Wait for all product details promises to resolve
        const productDetails = await Promise.all(productDetailPromises);

        const response = {
            cartItems: cartItems,
            products: productDetails,
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Please try Again Later", error });
    }
});

router.post("/deleteitem/:userid/:productid", async (req, res) => {
    try {
        const userid = req.params.userid;
        const productid = req.params.productid;

        console.log("UserID:", userid);
        console.log("ProductID:", productid);

        const deletedItem = await cartmodel.findOneAndDelete({ userid: userid, productid: productid });

        if (deletedItem) {
            return res.status(200).json({ message: "Product Deleted Successfully" });
        } else {
            console.log("Document not found for deletion:", { userid, productid });
            return res.status(500).json({ message: "Product not Deleted" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal ERROR", error });
    }
});



module.exports = router;
