import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { dispalyorder } from '../Store/Orderslice';
import { Box, Container, Typography, Card, CardContent, CardMedia, Select, MenuItem } from '@mui/material';
import { Orderskeleten } from '../Component/Loading/Skeletenloadning';
import { Theme } from '../Theme';
import { useTheme } from '@emotion/react';

const Orderconform = () => {
  const theme = useTheme();
  const colors = Theme(theme.palette.mode);
  const userid = useParams();
  const dispatch = useDispatch();
  const orderData = useSelector((state) => state.order.orderdata);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // Default filter: all orders

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(dispalyorder(userid.userid));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, userid]);

  // console.log(orderData)
  // Filtered orders based on the selected filter
  const filteredOrders = orderData?.orderdata?.filter(item => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'pending') {
      return item.payment_status === 'pending';
    } else if (filter === 'delivered') {
      return item.payment_status === 'delivered';
    }
    return false;
  });

  // Sort orders by the time difference from the present in descending order (newest first)
  const sortedOrders = filteredOrders?.slice().sort((a, b) => {
    const timeA = new Date(a.time);
    const timeB = new Date(b.time);

    // Check if timeA and timeB are valid date objects
    if (isNaN(timeA.getTime())) return 1; // Consider timeA as oldest if it's not a valid date
    if (isNaN(timeB.getTime())) return -1; // Consider timeB as oldest if it's not a valid date

    return timeB - timeA; // Sort in descending order (newest first)
  });


  return (
    <Container>
      <Box>
        <Typography variant='h1' sx={{ textAlign: "center", mb: 2, mt: 2 }}>Order History</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Filter dropdown */}
        <Select value={filter} onChange={(e) => setFilter(e.target.value)} sx={{ mb: 2 }}>
          <MenuItem value="all">All Orders</MenuItem>
          <MenuItem value="pending">Pending Orders</MenuItem>
          <MenuItem value="delivered">Delivered Orders</MenuItem>
        </Select>
        {/* Render orders */}
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {loading ? (
            // Render the skeleton loading component when loading
            Array.from({ length: 10 }).map((_, index) => (
              <Box key={index} sx={{ margin: '20px', width: '80%' }}>
                <Orderskeleten />
              </Box>
            ))
          ) : (sortedOrders && sortedOrders.map((item) => (
            item.orderItems && item.orderItems.length > 0 && (
              <Card key={item._id} sx={{ border: "3px solid black", marginBottom: 2, display: 'flex', width: '80%', backgroundColor: colors.primary[6000] }}>
                <CardMedia component="img" height="140" image={item.orderItems[0].img1}
                  alt="Product Image" sx={{ width: '50vh', objectFit: 'cover', height: "30vh", borderRadius: 3 }}
                />
                <CardContent sx={{ width: '50%' }}>
                  <Typography variant="h5" component="div">
                    Product Name: {item.orderItems[0].product_name}
                  </Typography>
                  <Typography> Order ID: {item._id} </Typography>
                  <Typography> Charges: {item.charges} </Typography>
                  <Typography> Payment Status: {item.payment_status} </Typography>
                  <Typography> Order Time: {item.time} </Typography>
                  <Typography> Total Price with Charges: {item.orderItems[0].withcharges} </Typography>
                </CardContent>
              </Card>
            )
          )))}
        </Box>
      </Box>
    </Container>
  );
};

export default Orderconform;
