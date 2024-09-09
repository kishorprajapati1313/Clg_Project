const mongooes = require("mongoose");

const signSchema = new mongooes.Schema({
    email: String,
    username: String,
    password: String,
    credit: Number,
    usecredit: Number,
});

const signmodel = mongooes.model("sign", signSchema);
module.exports = signmodel;