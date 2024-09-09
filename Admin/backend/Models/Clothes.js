const mongooes = require("mongoose")

const ClothesSchema = new mongooes.Schema({
    fname: String,
    email: String,
    pass: String,
    access: String
})

const ClothesModel = mongooes.model('adminuser',ClothesSchema)
module.exports = ClothesModel;