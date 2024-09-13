import { Typography, Grid, Paper, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveorderdeatil } from '../Store/Orderslice';
import { Theme } from '../Theme';
import { useTheme } from '@emotion/react';

const Placeorder = () => {
    const theme = useTheme();
    const colors = Theme(theme.palette.mode);
    const product = useSelector((state) => state.order.product);
    const formData = useSelector((state) => state.order.orderform);
    const [charges, setCharges] = useState();
    const [payment, setPayment] = useState({ payment: formData?.payment || "COD" });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!product || !formData) {
            navigate('/');
        }

        if (product && product.totalcartitems) {
            setCharges(50);
        }
    }, [navigate, product, formData]);

    const totalAmount = () => {
        let totalPrice = 0;

        if (product && product.totalcartitems) {
            product.totalcartitems.forEach((item) => {
                totalPrice += item.price + charges;
            });
        }
        return totalPrice;
    };

    const handlePaymentChange = (e) => {
        setPayment({ ...payment, [e.target.name]: e.target.value });
    };

    let orderstatus

    if (payment.payment === "COD") {
        orderstatus = "Place Order"
    } else {
        orderstatus = "Process Payment"
    }

    const handleSubmit = () => {
        if (product && product.totalcartitems) {
            const updatedItems = product.totalcartitems.map((item) => ({
                ...item,
                singleprice: item.price / item.qty,
                withoutcharges: item.price,
                withcharges: item.price + charges
            }));

            const updatedProduct = { ...product };
            updatedProduct.totalcartitems = updatedItems;

            const orderdetails = {
                product: updatedProduct,
                formdata: formData,
                payment: payment,
                charges: charges,
                totalamount: totalAmount()
            };

            if (payment.payment === "COD") {
                dispatch(saveorderdeatil(orderdetails));
                console.log(orderdetails);
                navigate("/");
            } else {
                navigate("/");
            }
        }
    };

    return (
        <Container>
            <Typography variant='h1'>Order Details</Typography>
            <Box sx={{ backgroundColor: "black", mb: 6 }}>
                <Grid container spacing={3} style={{ backgroundColor: `${colors.primary[6000]}` }}>
                    {/* Product Details Column */}
                    <Grid item xs={8} >
                        <Paper elevation={3} style={{ padding: '20px', backgroundColor: `${colors.primary[8000]}` }}>
                            <Typography variant='h4'>Product Details</Typography>
                            <Typography variant='h6' sx={{mb:1}}>Total Items: {product?.totalcartitems?.length}</Typography>
                            {product &&
                                product.totalcartitems.map((item, index) => (
                                    <Grid container key={index} alignItems='center' style={{ marginBottom: '10px', borderBottom: '3px solid #ddd',backgroundColor: `${colors.primary[6000]}` }}>
                                        <Grid item>
                                            <img src={item.img1} alt={item.name} style={{ width: '30vh', height: '20vh', marginRight: '10px' }} />
                                        </Grid>
                                        <Grid item>
                                            <Typography fontSize='20px'>Product Name: {item.product_name}</Typography>
                                            <Typography>Price: ${item.price}</Typography>
                                            <Typography>Charges: {charges}</Typography>
                                            <Typography>Quantity: {item.qty}</Typography>
                                            <Typography>Total Price: ${item.price + charges}</Typography>
                                        </Grid>
                                    </Grid>
                                ))}

                        </Paper>
                    </Grid>

                    {/* Form Information and Payment Status Column */}
                    <Grid item xs={4}>
                        <Paper elevation={3} style={{ padding: '20px',backgroundColor: `${colors.primary[8000]}` }} sx={{ mr: 2 }}>
                            <Typography variant='h4'>Form Information</Typography>
                            <Typography>First Name: {formData?.fname}</Typography>
                            <Typography>Last Name: {formData?.lname}</Typography>
                            <Typography>Email: {formData?.email}</Typography>
                            <Typography>Mobile no: {formData?.mobile_no}</Typography>
                            <Typography>country: {formData?.country}</Typography>
                            <Typography>state: {formData?.state}</Typography>
                            <Typography>city: {formData?.city}</Typography>
                            <Typography>street: {formData?.street}</Typography>
                            {/* Add other form details as needed */}

                            <Typography variant='h5'>Total Price: ${totalAmount()}</Typography>
                            <Typography variant='h6'>Payment Status</Typography>
                            <RadioGroup row name='payment' value={payment.payment} onChange={handlePaymentChange}>
                                <FormControlLabel value='COD' control={<Radio />} label='COD' />
                                <FormControlLabel value='Other' control={<Radio />} label='Other' />
                            </RadioGroup>

                            <Button variant='contained'  style={{ marginTop: '10px', backgroundColor: `${colors.primary[600]}` }} onClick={handleSubmit} >
                                {orderstatus}
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Placeorder;
