const monoose = require("mongoose");

const imageSchema = new monoose.Schema({
    userid: String,
    image: String,
    time: Date,
})

const imagemodel = monoose.model("imagedata", imageSchema);
module.exports = imagemodel;