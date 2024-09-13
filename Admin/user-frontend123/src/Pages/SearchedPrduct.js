import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Grid, Grow, Container } from '@mui/material';
import { Productskeleten } from '../Component/Loading/Skeletenloadning';
import { Theme } from '../Theme';
import { useTheme } from '@emotion/react';

const SearchedProduct = () => {
    const { suggestion } = useParams(); // Get the suggestion name from the URL params
    const theme = useTheme();
    const colors = Theme(theme.palette.mode);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await axios.get('http://localhost:1415/product');
                if (result && result.data) {
                    setProducts(result.data);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Filter products based on the suggestion name
    const filteredProducts = products.filter(product =>
        product.product_name.toLowerCase().includes(suggestion.toLowerCase())
    );

    return (
        <Container>
            {loading ? <Productskeleten /> : ""}
            <Grid container spacing={2} justifyContent="center" style={{ padding: '20px' }}>
                <Grid item xs={12} sm={9}>
                    <Grid container spacing={2}>
                        {filteredProducts.map((product) => (
                            <Grow key={product._id} in={true} timeout={100}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Link to={`/viewproduct/${product._id}`} style={{ textDecoration: 'none' }}>
                                        <Card
                                            sx={{
                                                backgroundColor: colors.primary[6000],
                                                width: '100%',
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                borderRadius: 5,
                                                transition: 'transform 0.3s, box-shadow 0.3s',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    transform: 'scale(1.05)',
                                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                                                    backgroundColor: colors.primary[8000],
                                                },
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={product.img1}
                                                alt={product.name}
                                                sx={{
                                                    objectFit: 'cover',
                                                    borderRadius: '5px 5px 0 0',
                                                    transition: 'transform 0.3s',
                                                    '&:hover': {
                                                        transform: 'scale(1.1)',
                                                        opacity: 0.8,
                                                    },
                                                }}
                                            />
                                            <CardContent>
                                                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                                                    {product.product_name}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {product.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </Grid>
                            </Grow>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default SearchedProduct;
