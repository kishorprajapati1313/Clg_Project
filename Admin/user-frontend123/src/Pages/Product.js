import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Grid, Grow, Container } from '@mui/material';
import { Productskeleten } from '../Component/Loading/Skeletenloadning';
import { Theme } from '../Theme';
import { useTheme } from '@emotion/react';

const Product = () => {
  const theme = useTheme();
  const colors = Theme(theme.palette.mode);
  const { cat } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setloading] = useState(true);
  const [columns] = useState(3); // Initial value for the number of columns

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const res = await axios.get(`http://localhost:1415/category/${cat}`);
        const res = await axios.get('http://localhost:1415/product');
        setProducts(res.data);
        setloading(false)
      } catch (error) {
        console.error("Error in fetching products", error);
        setloading(false)
      }
    };

    fetchProducts();
  }, [cat]);

  // Group products into sets based on the number of columns
  const productSets = [];
  for (let i = 0; i < products.length; i += columns) {
    productSets.push(products.slice(i, i + columns));
  }


  return (
    <Container>
      {loading ? <Productskeleten /> : ""}
      <Grid container spacing={2} justifyContent="center" style={{ padding: '20px' }}>
        <Grid item xs={12} sm={9}>
          {productSets.map((set, index) => (
            <Grid container spacing={2} key={index} style={{ marginBottom: '30px' }}>
              {loading ? (
                // Render ProductSkeletonLoading component when loading
                Array.from({ length: 10 }).map((_, cardIndex) => (
                  <Grid item xs={12 / columns} sm={12 / (columns / 2)} md={12 / columns} key={cardIndex}>
                    <Productskeleten />
                  </Grid>
                ))
              ) : (
                <>
                  {set.map((product) => (
                    // Conditionally render Grow only when loading is false
                    !loading && (
                      <Grow key={product._id} in={true} timeout={100}>
                        <Grid item xs={12 / columns} sm={12 / (columns / 2)} md={12 / columns}>
                          <Link to={`/viewproduct/${product._id}`} style={{ textDecoration: 'none' }}>
                            {/* Adjust the column widths based on the number of columns */}
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
                    )
                  ))}
                </>
              )}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );

};

export default Product;
