import React from 'react';
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { Theme } from '../Theme';
import { useTheme } from '@emotion/react';

const Catproduct = () => {
  const theme = useTheme();
  const colors = Theme(theme.palette.mode) 
  const clothingData = [
    { id: 1, name: 'Shirt' },
    { id: 2, name: 'Jeans' },
    { id: 3, name: 'Pants' },
    { id: 4, name: 'Other' },
    { id: 5, name: 'Hat' },
    { id: 6, name: 'Jacket' },
    { id: 7, name: 'Socks' },
    { id: 8, name: 'Shorts' },
    { id: 9, name: 'Skirt' },
    { id: 10, name: 'Sweater' },
    // Add more clothing items as needed
  ];

  const limitedData = clothingData.slice(0, 5);

  return (
    <Grid container spacing={1} mb={3} mt={1}>
      {limitedData.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={1} key={item.id}>
          <Link to={`/category/${item.name}`} style={{ textDecoration: 'none' }}>
            <Button variant="contained" style={{ backgroundColor: colors.grey[6000] }} fullWidth>
              {item.name}
            </Button>
          </Link>
        </Grid>
      ))}
      
    </Grid>
  );
};

export default Catproduct;
