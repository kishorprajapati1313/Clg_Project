const express = require("express");
const userdatamode = require("../Model/Userdatamode");
const signmodel = require("../Model/signmodel");

const router = express.Router();

router.post("/checkcredit", async (req, res) => {
    const { user } = req.body;

    try {
        const userid = user._id
        const userdata = await signmodel.findOne({_id:userid})
        console.log("userdata" + userdata)
        console.log("User credit:", userdata.credit);
        const credit = parseInt(userdata.credit);
        if (credit <= 0) {
            // User has insufficient credits
            return res.status(200).json({ mtype: "warning", message: "Insufficient credit. Please purchase credits to generate images." });
        } else {
            // User has sufficient credits
            return res.status(200).json({ mtype: "success", message: "Sufficient credit. Proceed with image generation." });
        }
    } catch (error) {
        return res.status(200).json({ mtype: "fail", message: "Internal Error." });
        // return res.status(500).json({ mtype: "fail", message: "Internal Error." });
    }
});

router.post("/genrateduserdata", async (req, res) => {
    const { generatedId, userdata } = req.body;
    
    try {
        console.log("Received request:", { generatedId, userdata });

        // Save the generated data
        const newgenratedata = new userdatamode({
            userid: userdata.user._id,
            generatedid: generatedId,
            time: new Date(),
        });
        await newgenratedata.save();
        console.log("New generated data saved:", newgenratedata);

        // Retrieve the user from the database based on the provided user ID
        const user = await signmodel.findById(userdata.user._id);
        if (!user) {
            console.log("User not found.");
            return res.status(404).json({ mtype: "warning", message: "User not found" });
        }
        console.log(user)
        // Update the user's credit
        user.credit -= 2;
        user.usecredit += 2;

        console.log("Updated user:", user);

        // Save the updated user back to the database
        await user.save();
        console.log("User saved with updated credit.");

        return res.status(200).json({ mtype: "success", message: "Data saved successfully and user credit decreased." });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ mtype: "fail", message: "Oops, Something Wrong!" });
    }
});



router.get("/gethistroy/:userid", async(req,res) =>{
    const userid =req.params;

    try {
        const userHistory = await userdatamode.find({ userid: userid.userid });
        // Check if any data was found
        if (userHistory.length > 0) {
            // If data found, send it as JSON response
            res.json({mtype:"success", success: true, history: userHistory });
        } else {
            // If no data found, send a message indicating so
            res.json({mtype:"waring", success: true, message: "No history found for the user." });
        }
    } catch (error) {
        // If an error occurs, send an error response
        res.status(500).json({ mtype:"fail",success: false, message: "Error fetching user history." });
    }
})


module.exports = router;
