const express = require("express");
const imagemodel = require("../Model/Imagemodel");
const signmodel = require("../Model/signmodel");

const app = express();
const router = express.Router();
app.use(express.json({ limit: '100mb' }));

router.post("/saveimagedata", async (req, res) => {
    const { userdata, image } = req.body.imageDataObject;

    console.log("Received request to save image data");
    console.log("User Data:", userdata);
    console.log("Image:", image);

    try {
        // Check if the user exists
        const foundUser = await signmodel.findById(userdata.user._id);
        // console.log("User found:", foundUser);

        if (!foundUser) {
            console.log("User not found");
            return res.status(200).json({ mtype: "warning", message: "User not found" });
        }

        // Save the image data
        const newImage = await imagemodel.create({
            userid: userdata.user._id,
            image: image, // Save the Base64 encoded image string
            time: new Date()
        });
        console.log("New image created:", newImage);

        foundUser.credit -= 2;
        foundUser.usecredit += 2;
        await foundUser.save();
        // console.log("User credits updated:", foundUser);

        return res.status(200).json({ mtype: "success", message: "Image data saved successfully" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ mtype: "fail", message: "Internal Server Error" });
    }
});


router.get("/userimagehistroy/:userid", async (req, res) => {
    const { userid } = req.params;
    try {
        console.log(userid);
        const userImages = await imagemodel.find({ userid });

        return res.status(200).json({ mtype: "success", message: "Successfully found", getuser: userImages });
    } catch (error) {
        console.error("Error fetching user image history:", error);
        return res.status(500).json({ mtype: "fail", message: "Oops! Something went wrong!!!" });
    }
});


module.exports = router;
