const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    userid: String,
    productid: String,
});

const cartModel = mongoose.model('addcart', CartSchema);
module.exports = cartModel;
