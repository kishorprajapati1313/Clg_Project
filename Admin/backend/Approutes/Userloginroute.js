const express = require("express");
const router = express.Router();
const userloginModel = require("../Models/userlogin");

router.post("/usersignin", async (req, res) => {
    try {
        const signin = req.body;

        const checkuser = await userloginModel.findOne({ email: signin.email });
        if (checkuser) {
            return res.status(600).json({ error: "Email is Already Exists" });
        } else {
            signin.access = "user";

            await userloginModel
                .create(signin)
                .then((result) => {
                    res.json(result);
                })
                .catch((err) => {
                    res.status(500).json({ error: err.message });
                });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.post("/logincheck", async (req, res) => {
    try {
        const logincheck = req.body;
        const usercheck = await userloginModel.findOne({ email: logincheck.email, password: logincheck.password });

        if (usercheck) {
            return res.status(200).json({ message: "Login Success", user: { email: usercheck.email, username: usercheck.username,  _id: usercheck._id } });
        } else {
            return res.status(500).json({ error: "Invalid credentials" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


module.exports = router;
