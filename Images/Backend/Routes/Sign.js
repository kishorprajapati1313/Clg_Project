const express = require("express");
const signmodel = require("../Model/signmodel");

const router = express.Router();

router.post("/signin", async (req, res) => {
    const userdata = req.body;
    // console.log(userdata)
    try {
        const exsitentuser = await signmodel.findOne({ email: userdata.email });
        if (!exsitentuser) {
            const newuser = new signmodel({
                ...userdata,
                credit: 3,
                usecredit: 0,
            })

            console.log("user created........");
            await newuser.save();
            res.status(200).json({ messageType: "success", message: "User created successfully",user: newuser });

        } else {
            res.status(201).json({ messageType: "warning", message: "User Already exists" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})

router.post("/login", async (req, res) => {
    const userdata = req.body;
    try {
        const checkuser = await signmodel.findOne({ email: userdata.email, password: userdata.password })

        if (!checkuser) {
            res.status(200).json({ messageType: "waring", message: "Invalid Creditial" });
        } else {
            res.status(200).json({messageType:"success", message:"Valid Credential", user: checkuser})
        }

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})

router.get("/getdata/:userid", async(req,res) =>{
    const {userid} = req.params;
    try {
        const user = await signmodel.findOne({_id :userid})
        if(user){
            res.status(200).json({message:"fetch suuccess", user})
        }else{
            res.status(201).json({message:"fetch fail"})
        }

    } catch (error) {
        res.status(500).json({message:"internal failure"})
    }
})



module.exports = router; 