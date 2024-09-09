const mangoose = require("mongoose");

const paymentSchema = new mangoose.Schema({
    userid: String,
    payment_status: String,
    payment_time: Date,
    amount: String,
    credit: String,
})

const paymentmodel = new mangoose.model("payment", paymentSchema);
module.exports = paymentmodel