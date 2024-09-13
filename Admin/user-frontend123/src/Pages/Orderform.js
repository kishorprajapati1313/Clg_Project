import { Typography, TextField, Radio, RadioGroup, FormControlLabel, Grid, Button } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveorderform, saveorderproduct } from '../Store/Orderslice';
import { useTheme } from '@emotion/react';
import { Theme } from '../Theme';

const Orderform = () => {
    const theme = useTheme();
    const colors = Theme(theme.palette.mode);
    const [orderdeatils, setorderdeatils] = useState({ fname: "", lname: "", email: "", mobile_no: "", country: "india", state: "", city: "", street: "", pincode: "", payment: "" });
    const [errors, setErrors] = useState({ email: false, mobile_no: false });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlechange = (e) => {
        setorderdeatils({ ...orderdeatils, [e.target.name]: e.target.value });
    }

    const handleonsubmit = async () => {
        let valid = true;
        const newErrors = { ...errors };

        // Email validation
        if (!orderdeatils.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
            newErrors.email = true;
            valid = false;
        } else {
            newErrors.email = false;
        }

        // Mobile number validation
        if (!orderdeatils.mobile_no.match(/^\d{10}$/)) {
            newErrors.mobile_no = true;
            valid = false;
        } else {
            newErrors.mobile_no = false;
        }

        setErrors(newErrors);

        if (valid) {
            await dispatch(saveorderform(orderdeatils));
            navigate("/placeorder");
        } else {
            alert("Please fill out all required fields correctly.");
        }
    }

    return (
        <Container>
            <Box sx={{ textAlign: "center", border: "1px solid black", borderRadius: 8, boxShadow: 1, p: 4, mt: 6, mb: 1 }} backgroundColor={colors.grey[8000]}>
                <Typography variant='h2' mb={4}>Order Details</Typography>

                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={6}>
                        <Box sx={{ textAlign: "left" }}>
                            <Typography variant="h6">First Name</Typography>
                            <TextField name="fname" value={orderdeatils.fname} onChange={handlechange} label="First Name" variant="outlined" fullWidth required />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{ textAlign: "left" }}>
                            <Typography variant="h6">Last Name</Typography>
                            <TextField name="lname" value={orderdeatils.lname} onChange={handlechange} label="Last Name" variant="outlined" fullWidth required />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{ textAlign: "left" }}>
                            <Typography variant="h6">Email</Typography>
                            <TextField name="email" value={orderdeatils.email} onChange={handlechange} type="email" label="Email" variant="outlined" fullWidth required error={errors.email} />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{ textAlign: "left" }}>
                            <Typography variant="h6">Mobile Number</Typography>
                            <TextField name="mobile_no" value={orderdeatils.mobile_no} onChange={handlechange} type="tel" inputProps={{ maxLength: 10 }} label="Mobile Number" variant="outlined" fullWidth required error={errors.mobile_no} />
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box sx={{ textAlign: "left" }} >
                            <Typography variant="h6">Country</Typography>
                            <TextField name="country" value="India" disabled label="Country" variant="outlined" fullWidth />
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box sx={{ textAlign: "left" }}>
                            <Typography variant="h6">State</Typography>
                            <TextField name="state" value={orderdeatils.state} onChange={handlechange} label="State" variant="outlined" fullWidth required />
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box sx={{ textAlign: "left" }}>
                            <Typography variant="h6">City</Typography>
                            <TextField name="city" value={orderdeatils.city} onChange={handlechange} label="City" variant="outlined" fullWidth required />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{ textAlign: "left" }}>
                            <Typography variant="h6">Street</Typography>
                            <TextField name="street" value={orderdeatils.street} onChange={handlechange} label="Street" variant="outlined" fullWidth required />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{ textAlign: "left" }}>
                            <Typography variant="h6">Pin Code</Typography>
                            <TextField name="pincode" value={orderdeatils.pincode} onChange={handlechange} type="number" label="Pin Code" variant="outlined" fullWidth required />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ textAlign: "left" }}>
                            <Typography variant="h6">Payment Type</Typography>
                            <RadioGroup row name="payment" value={orderdeatils.payment} onChange={handlechange} >
                                <FormControlLabel value="COD" control={<Radio />} label="Cash On Delivery" />
                            </RadioGroup>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ textAlign: "center", mt: 4, }}>
                            <Button variant="contained" color="primary" onClick={handleonsubmit}>
                                <Typography variant='h5' sx={{ fontWeight: 'bold', color: "white" }}>Process Order</Typography>
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default Orderform;
