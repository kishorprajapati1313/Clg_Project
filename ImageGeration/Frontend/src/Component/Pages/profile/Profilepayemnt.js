import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Sidebar from '../../Componets/Sidebar'
import { loadStripe } from "@stripe/stripe-js"
import axios from 'axios'
import { getuser } from '../../Componets/Navbar'

const Profilepayemnt = () => {
    const [ruppe, setruppe] = useState("1")
    const [credit, setcredit] = useState("")
    const user = getuser();

    const userid = user.user._id

    const handleRupeesChange = (e) => {
        let amount = e.target.value
        // Remove non-numeric characters
        amount = amount.replace(/\D/g, '');
        setruppe(amount)
    };

    const handlePayment = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Make API request to backend to initiate payment
        try {
            const response = await axios.post('http://localhost:5000/checkout', {
                amount: ruppe, userid
            });

            const { sessionId } = response.data;
            console.log(sessionId)
            // Redirect to Stripe checkout page
            const stripe = await loadStripe("pk_test_51P8h7jSDGOWUAXLsRdTR8F8Gk7FedhP8idXcIZIBgtUB7AtBsfjH2hmi9YCthmsfD2P6tmAkdCk90U48jELjhrei00ozfSuae4");
            const { error } = await stripe.redirectToCheckout({
                sessionId: sessionId
            });

            if (error) {
                console.error('Error redirecting to checkout:', error);
                // Handle error
            }
        } catch (error) {
            console.error('Error initiating payment:', error);
            // Handle error
        }
    };

    // Calculate credit when rupee value changes
    React.useEffect(() => {
        const convertaratio = 2
        setcredit(ruppe * convertaratio)
    }, [ruppe]);

    return (
        <div style={{ margin: "20px" }}>
            
        <Grid container spacing={2} >
            {/* Sidebar */}
            <Grid item xs={12} sm={3}>
                <Sidebar /> {/* Use the Sidebar component here */}
            </Grid>
            <Grid item xs={12} sm={9} >
                <Typography variant='h4' style={{ fontFamily: 'Georgia, serif', textAlign: "Center",color:"white" }}>
                    BILLING
                </Typography>
                <Paper style={{ padding: '20px' }} sx={{background:"lightgrey"}}>
                    <form onSubmit={handlePayment}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    label="Enter your Amount Here"
                                    variant="outlined"
                                    fullWidth
                                    value={ruppe}
                                    onChange={handleRupeesChange}
                                    inputMode="numeric"  // Allow only numeric input
                                    pattern="[0-9]*"  // Only allow digits
                                />

                                {credit !== 0 ? (  // Render credit if it's not equal to 0
                                    <Typography variant="subtitle1" style={{ marginTop: '10px' }}>
                                        Credits: {credit}
                                    </Typography>
                                ) : (
                                    <Typography variant="subtitle1" style={{ marginTop: '10px' }}>
                                        Credits: 0
                                    </Typography>
                                )}
                            </Grid>

                            <Grid item xs={12} sm={6} md={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="contained" color="primary" type="submit" style={{ marginTop: '10px', maxHeight:"50px", width:"auto" }}>
                                    Pay via Stripe
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    </div>
    )
}

export default Profilepayemnt
