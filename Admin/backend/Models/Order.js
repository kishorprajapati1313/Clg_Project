const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  orderid: mongoose.Schema.Types.ObjectId,
  product_id: String,
  product_name: String,
  img1: String,
  qty: Number,
  singleprice: Number,
  withoutcharges: Number,
  withcharges: Number,
});

const OrderSchema = new mongoose.Schema({
  charges: Number,
  userid: String,
  fname: String,
  lname: String,
  email: String,
  mobile_no: String,
  country: String,
  state: String,
  city: String,
  street: String,
  pincode: String,
  payment_type: String,
  payment_status: String,

  order_status:String,
  time: {
    type: Date,
    default: Date.now,
  },
  orderItems: [OrderItemSchema], // Array of order items
});

const ordermodel = mongoose.model("order", OrderSchema);

module.exports = ordermodel;
