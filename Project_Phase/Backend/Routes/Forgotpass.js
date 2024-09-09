const express = require("express")
const forgotpassmodel = require("../Model/Forgotpassmodel");
const signmodel = require("../Model/signmodel")
const nodemailer = require('nodemailer');

const router = express.Router()

router.post("/getuser", async (req, res) => {
    const { email } = req.body;
    // console.log(email)

    try {
        const checkemail = await signmodel.findOne({ email: email })

        if (checkemail) {
            res.status(200).json({ mtype: "success", message: "email is exists", checkemail })

        } else {
            res.status(200).json({ mtype: "warning", message: "email does not exist" });
        }

    } catch (error) {
        res.status(500).json({ mtype: "fail", message: "Internal Failer" })
    }
})

router.post("/sendmail", async (req, res) => {
    const { randomCode, email } = req.body;
    console.log(randomCode)

    try {
        // email send settings
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'kjhgfdsa1014@gmail.com', // Your Gmail email address
                pass: 'lczr felm afkq dwuw' // Your Gmail password or App Password
            }
        });

        // Define email options
        let mailOptions = {
            from: 'kjhgfdsa1014@gmail.com', // Sender email address
            to: email, // Recipient email address
            subject: "Forgot Password OTP", // Subject line
            html: `
                <p>Dear User,</p>
                <p>You recently requested to reset your password for your account. Here is your One-Time Password (OTP) to complete the password reset process:
                <p style="font-weight: bold;">${randomCode}</p></p>
                <p>Please enter this OTP in the designated field on the password reset page. This OTP is valid for a limited time only.</p>
                <p>If you did not request a password reset, please ignore this email. Your account is secure and no action is required.</p>
                <p>Thank you,<br/>Your Company Name Team</p>
            `
        };
        const sendmail = await transporter.sendMail(mailOptions);

        if (sendmail) {
            // Save the data along with current time
            const forgotdata = new forgotpassmodel({
                email: email,
                randomcode: randomCode.toString(),
                submittime: Date.now(), // Save the current time when the code is submitted
                expiretime: Date.now() + (2 * 60 * 1000) // Set expiration time to 5 minutes from current time
            });
            await forgotdata.save(); // Save the data to the database
            // console.log("Forgot password data saved successfully.");
        }

        res.status(200).json({ mtype: "success", message: "successfully send mail" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mtype: "fail", message: "Internal failure" });
    }
});

router.post("/codecheck", async (req, res) => {
    const { code, email } = req.body;
    code.toString();  // Assuming this is for converting code to string, but this doesn't modify the original variable                      
    try {
        const checkcode = await forgotpassmodel.findOne({ randomcode: code, email: email });

        if (!checkcode) {
            return res.status(200).json({ mtype: "warning", message: "Invalid verification code." });
        }

        const currentTime = Date.now();
        if (!checkcode.randomcode || code.length !== checkcode.randomcode.length || currentTime > checkcode.expiretime) {
            return res.status(200).json({ mtype: "warning", message: "Invalid verification code." });
        }

        res.status(200).json({ mtype: "success", message: "Verification code is valid." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mtype: "fail", message: "Internal failure" });
    }
});

router.post("/updatepass", async (req, res) => {
    console.log("Update Password Request Received"); // Log the request
    const { newPassword, email } = req.body;
    
    try {
        const user = await signmodel.findOneAndUpdate(
            { email },
            { password: newPassword },
            { new: true } // This option ensures the updated document is returned
        );

        if (!user) {
            return res.status(200).json({ mtype: "warning", message: "User not found" });
        }

        return res.status(200).json({ mtype: "success", message: "Password updated successfully" });
    } catch (error) {
        return res.status(500).json({ mtype: "fail", message: "Internal error" });
    }
});




module.exports = router;


// pass: lczr felm afkq dwuw