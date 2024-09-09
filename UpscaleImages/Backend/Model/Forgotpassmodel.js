const mongooes = require("mongoose");


const forgotpassSchema = new mongooes.Schema({
    email: String,
    userid: String,
    randomcode: String,
    submittime: Date,
    expiretime: Date,
    
})

const forgotpassmodel = new mongooes.model("forgot", forgotpassSchema)
module.exports = forgotpassmodel;