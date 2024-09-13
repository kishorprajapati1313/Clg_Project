//View-Product In Home Page
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import Slider from 'react-slick';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Theme } from '../Theme';
import { useTheme } from '@emotion/react';
import Skeletenloadning from './Loading/Skeletenloadning';
import { Link } from 'react-router-dom';

const ViewProduct = () => {
  const theme = useTheme();
  const colors = Theme(theme.palette.mode);
  const [products, setProducts] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:1415/product');
        setProducts(response.data);
        setloading(false)
      } catch (error) {
        console.error('Error fetching products:', error);
        setloading(false)
      }
    };

    fetchProducts();
  }, []);

  const NavigateNextArrow = ({ onClick }) => (
    <IconButton onClick={onClick} sx={{ position: 'absolute', top: '50%', right: '0', transform: 'translateY(-50%)' }}>
      <NavigateNextIcon />
    </IconButton>
  );

  const InvisiblePrevArrow = () => null;

  const sortdesc = (desc, maxlength) => {
    return desc.length > maxlength ? `${desc.slice(0, maxlength)} + "..."` : desc;
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NavigateNextArrow />,
    prevArrow: <InvisiblePrevArrow />, // Use the invisible component
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ mt: '100px', }}>
      <Typography variant='h2' sx={{
        background: `linear-gradient(45deg, ${colors.primary[100]} 30%, ${colors.grey[300]} 90%)`,
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        fontWeight: 'bold',
        textAlign: 'center',
      }}>Popular Clothes</Typography>

      <Box sx={{
        mt: "3%",
        border: '1px solid ' + colors.primary[800],
        position: 'relative',
        overflow: 'hidden',
        boxShadow: "5px 5px 10px 10px" + colors.grey[8000],
        background: `radial-gradient(circle, ${colors.grey[8000]}, ${colors.primary[8000]})`,
        borderRadius: '20px', // Adjust the radius as needed
      }}>

        <Box sx={{ m: "5px" }}>
          <Slider {...settings} sx={{ position: 'relative', }}>

            {/* Render Skeleten Loading */}
            {loading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <Skeletenloadning key={index} />
              ))
            ) : (
              products.map((product) => (
                <div key={product._id}>
                  <Link to={`/viewproduct/${product._id}`} style={{ textDecoration: 'none' }}>

                    <Card
                      sx={{
                        ml: '40px',
                        mr: '20px',
                        borderRadius: '10px',
                        position: 'relative',
                        backgroundColor: colors.primary[8000],
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'scale(1.05)',
                          backgroundColor: colors.grey[8000],
                        },
                      }}
                    >
                      <CardMedia component="img" height="140px" width="100%" image={product.img1} alt={product.name} margin="10px" />
                      <CardContent>
                        <Typography variant="h5" fontWeight="bold" sx={{ mb: '5px' }}>
                          {product.product_name}
                        </Typography>
                        <Typography variant="p" sx={{ mb: '5px' }}>
                          {sortdesc(product.desc, 100)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ))
            )}

          </Slider>
        </Box>
      </Box>
    </Box >
  );
};

export default ViewProduct;
