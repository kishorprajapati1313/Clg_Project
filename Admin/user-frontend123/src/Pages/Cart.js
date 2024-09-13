import React, { useEffect, useState } from 'react';
import { Button, IconButton, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartlist, deleteitem } from '../Store/cartslice';
import { useTheme } from '@emotion/react';
import { Theme } from '../Theme';
import { saveorderproduct } from '../Store/Orderslice';
import { Cartskeleten } from '../Component/Loading/Skeletenloadning';

const Cart = () => {
    const theme = useTheme()
    const colors = Theme(theme.palette.mode);
    const userid = useParams();
    const [totalcart, settotalcart] = useState([]);
    const [totalproduct, settotalproduct] = useState([]);
    const [originalPrices, setOriginalPrices] = useState({}); // Store original prices
    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(cartlist({ userid: userid.id }));
    }, [dispatch]);

    const { cart, loading } = useSelector((state) => state.cart);

    useEffect(() => {
        const products = cart?.products || [];

        settotalcart(cart?.cartItems || []);
        settotalproduct(products.map((item) => ({ ...item, qty: 1 })));
        setOriginalPrices(
            products.reduce((prices, item) => {
                return { ...prices, [item._id]: item.price };
            }, {})
        );
    }, [cart]);

    const handleqty = (productid, newqty) => {
        const updateproduct = totalproduct.map((item) => {
            if (item._id === productid) {
                const updatedQty = Math.max(1, Math.min(newqty, 10));
                const updatedPrice = originalPrices[productid] * updatedQty; // Calculate using original price
                return { ...item, qty: updatedQty, price: updatedPrice };
            }
            return item;
        });

        settotalproduct(updateproduct);
    };


    const handledelete = (productid) => {
        dispatch(deleteitem({ userid: userid.id, productid }))
    }

    const totalPrice = totalproduct.reduce((total, item) => total + item.price, 0);

    const handleconfirmorder = () => {
        const orderdeatil = {
            userid: userid.id,
            totalcartitems: totalproduct.map((item) => ({
                productid: item._id,
                qty: item.qty,
                price: item.price,
                img1: item.img1,
                product_name: item.product_name,

            })),
            totalPrice: totalPrice.toFixed(2)
        }
        dispatch(saveorderproduct(orderdeatil))

        navigate("/orderform")
    }


    return (
        <>
            <Container>
                <Typography variant='h1' sx={{ display: 'flex', textAlign: 'center', justifyContent: 'left' }} mt={1}>
                    Shopping Cart
                </Typography>
                <Typography variant='p'>This is the cart of the user:</Typography>
                <Box sx={{ m: '20px 40px', border: '3px solid black', height: '75vh', width: 'auto', overflowY: 'auto', backgroundColor: `${colors.grey[8000]}` }}>
                    <Typography variant='h3' sx={{ m: '10px 20px' }}>
                        TOTAL ITEMS : {totalcart.length}
                    </Typography>
                    <Box sx={{ m: '20px 40px', height: '60vh', width: 'auto', overflowY: 'auto' }}>
                        
                        {loading ? (
                            // Render SkeletonLoading component when loading
                            Array.from({ length: 10 }).map((_, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', borderBottom: `1px solid ${colors.grey[100]}`, p: 2 }}>
                                    <Cartskeleten />
                                </Box>
                            ))
                        ) : (
                            totalproduct.map((items) => (
                                <Box key={items._id} sx={{ display: 'flex', alignItems: 'center', borderBottom: `1px solid ${colors.grey[100]}`, p: 2 }}>
                                    {/* Your cart item details */}
                                    <Box>
                                        {items.img1 ? <img src={items.img1} width="120vh" height="80vh" alt={items.product_name} />
                                            : <ShoppingCartOutlinedIcon sx={{ fontSize: 40, mr: 2 }} />}
                                    </Box>
                                    <Box sx={{ flexGrow: 1, ml: '10px' }}>
                                        <Typography variant='h4'>{items.product_name}</Typography>
                                        <Typography variant='h4'>{items.price}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant='p'>Quntity:</Typography>
                                        <IconButton onClick={() => handleqty(items._id, items.qty - 1)}>-</IconButton>
                                        <Typography variant='p'>{items.qty}</Typography>
                                        <IconButton onClick={() => handleqty(items._id, items.qty + 1)}>+</IconButton>
                                        <IconButton onClick={() => handledelete(items._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                            ))
                        )}
                    </Box>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                    <Typography variant='h4' sx={{ mr: 4 }}>Total Price:</Typography>
                    <Typography variant='h2' sx={{ color: colors.grey[400], mr: '20px' }}>{`$${totalPrice.toFixed(2)}`}</Typography>
                    <Button onClick={handleconfirmorder} variant="contained" size="large" sx={{
                        mt: 1, mb: 2, backgroundColor: colors.greenAccent[500],
                        '&:hover': {
                            backgroundColor: 'darkgreen',
                        },
                    }}>
                        <Typography variant='h5' sx={{ fontWeight: 'bold', color: 'white' }}>Confirm Order</Typography>
                    </Button>
                </Box>
            </Container>
        </>
    );
};

export default Cart;
