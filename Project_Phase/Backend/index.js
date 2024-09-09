const express = require("express")
const mongoose = require("mongoose");
const cors = require("cors");
const signroute = require("./Routes/Sign");
const userdata = require("./Routes/Userdata");
const forgotpass = require("./Routes/Forgotpass")
const payment = require("./Routes/Payment")
const image = require("./Routes/Imagedat")

const app = express();
app.use(cors())
app.use(express.json()); // Body parsing middleware

mongoose.connect("mongodb://localhost:27017/commondb");


app.use(signroute);
app.use(userdata);
app.use(forgotpass);
app.use(payment);
app.use(image);

app.listen(5000, ()=>{
    console.log("Cnnected successfully")
})