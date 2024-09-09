const express = require('express');
const router = express.Router();
const adminuser = require('../Models/Clothes');

router.post('/login', async(req,res) => {
    try{
        const checkvalue = req.body
        await adminuser.findOne({email: checkvalue.email})
        .then(user => {
            if(user) {
                if(user.pass === checkvalue.pass){
                    res.json("Success");
                }else{
                    res.json("Increct Information")
                }
            }else{
                res.json("Invalid Information")
            }
        })
    }catch{

    }
})

router.post('/signin', async (req, res) => {
    try {
        const { email, pass, fname } = req.body;

        // Check if the email already exists
        const checkuser = await adminuser.findOne({ email });

        if (checkuser) {
            return res.status(400).json({ error: "Email Already Exists" });
        }

        // If email is not found, create a new user with default access as 'admin'
        const newUser = {
            email,
            pass,
            fname,
            access: 'admin', // Set default access value as 'admin'
        };

        adminuser.create(newUser)
            .then(result => res.json(result))
            .catch(err => res.status(500).json({ error: err.message }));

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


router.get("/adminuser", async (req,res) => {
    try {
        const alldata = await adminuser.find();
        res.json(alldata);
    } catch (error){
        res.status(500).json({error: error.message})
        
    }
})
module.exports = router;