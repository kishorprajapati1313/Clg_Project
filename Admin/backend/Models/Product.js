const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    product_name: String,
    price: Number,
    model: String,
    img1: String,
    desc: String,
    cat: String,
    sale_cat: String,
    und1: String,
    und2: String,
    und3: String,
})

const ProductModel = mongoose.model('addproducts',ProductSchema);
module.exports = ProductModel;