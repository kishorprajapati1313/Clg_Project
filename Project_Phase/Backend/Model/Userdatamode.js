const monoose = require("mongoose");

const userdataSchema = new monoose.Schema({
    userid: String,
    generatedid: String,
    time: Date,
})

const userdatamodel = monoose.model("userdata", userdataSchema);
module.exports = userdatamodel;