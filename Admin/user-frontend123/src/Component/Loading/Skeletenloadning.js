import React from 'react';
import { Card, CardContent, CardMedia, Skeleton, Grid } from '@mui/material';

const Skeletenloadning = () => {
    return (
        <>
            <Card
                sx={{
                    ml: '40px',
                    mr: '20px',
                    borderRadius: '10px',
                    position: 'relative',
                    transition: 'transform 0.3s',
                    '&:hover': {
                        transform: 'scale(1.05)',
                    },
                }}
            >
                <Skeleton variant="rectangular" height={140} width="100%" />
                <CardContent>
                    <Skeleton height={20} width="80%" />
                    <Skeleton height={10} width="100%" />
                    <Skeleton height={10} width="100%" />
                </CardContent>
            </Card>

        </>
    );
};

export const Cartskeleten = () => {
    return (
        <>
            <Skeleton variant="rectangular" height={80} width={120} />
            <div style={{ flexGrow: 1, marginLeft: '10px' }}>
                <Skeleton variant="text" height={20} width="70%" />
                <Skeleton variant="text" height={20} width="50%" />
            </div>
            <div>
                <Skeleton variant="text" height={20} width="40%" />
                <Skeleton variant="text" height={20} width="20%" />
                <Skeleton variant="text" height={20} width="20%" />
                <Skeleton variant="text" height={20} width="20%" />
            </div>
        </>
    )
}

export const Productskeleten = () => {
    return (
        <>
            <Card sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: 5 }}>
                <Skeleton variant="rectangular" height={200} sx={{ borderRadius: '5px 5px 0 0' }} />
                <CardContent>
                    <Skeleton height={30} width="80%" sx={{ marginBottom: 1 }} />
                    <Skeleton height={50} width="100%" />
                </CardContent>
            </Card>
        </>
    )
}

export const Orderskeleten = () => (
    <>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={6}>
                {/* Skeleton for the product image */}
                <Skeleton variant="rectangular" width="100%" height={200} style={{ marginBottom: 2 }} />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
                {/* Skeleton for the product information */}
                <Skeleton variant="text" width="100%" height={30} style={{ marginBottom: 10 }} />
                <Skeleton variant="text" width="100%" height={20} style={{ marginBottom: 10 }} />
                <Skeleton variant="text" width="100%" height={20} style={{ marginBottom: 10 }} />
                <Skeleton variant="text" width="100%" height={20} style={{ marginBottom: 10 }} />
            </Grid>
        </Grid>
    </>
);

export default Skeletenloadning;
