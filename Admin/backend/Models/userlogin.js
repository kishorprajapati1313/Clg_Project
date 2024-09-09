const mongoose = require("mongoose");

const userloginSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    access: String,
    und2: String,
    und3: String,
})

const userloginModel = mongoose.model('adduser',userloginSchema);
module.exports = userloginModel;