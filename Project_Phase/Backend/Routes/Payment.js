const express = require("express");
const router = express.Router();
const stripe = require('stripe')('sk_test_51P8h7jSDGOWUAXLshl5LG3IC8uWqOdRIVk04VGpywpmilckZTK6nhYVEVtAilUyYTlxgl5rnVibcnW2z2Z78tgEs00Rc5MKDOH');
const Payment = require("../Model/Payment");
const SignModel = require("../Model/signmodel");

router.post("/checkout", async(req, res) => {
    try {
        const { amount, userid } = req.body;
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Sample Item',
                    },
                    unit_amount: amount * 100, // Convert rupees to paise (Stripe uses the smallest currency unit)
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: 'http://localhost:3002/profile/home', // Redirect to this URL after successful payment
            cancel_url: 'http://localhost:3002/profile/bill',
        });

        const payment = new Payment({
            userid: userid,
            payment_status: 'success',
            payment_time: new Date(),
            amount: amount,
            credit: (amount * 2).toString(), // Calculate credit based on amount
        });

        // Save the payment record
        await payment.save();

        // Update user credit
        if (session.success_url) {
            await SignModel.findByIdAndUpdate(
                userid,
                { $inc: { credit: parseInt(payment.credit) } }, // Increment the credit field by the payment credit
                { new: true }
            );
        }

        res.json({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
