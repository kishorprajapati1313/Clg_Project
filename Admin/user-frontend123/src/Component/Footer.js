import React from 'react';
import { Theme } from '../Theme';
import { useTheme } from '@emotion/react';
import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';


function Footer() {
  const theme = useTheme();
  const colors = Theme(theme.palette.mode);

  return (
    <Box backgroundColor={colors.primary[6000]} >
      <Container maxWidth="lg" >
        <Typography variant="subtitle1" align="center" color={colors.grey[100]} component="p">
          Copyright © 2024 By KP
        </Typography>
      </Container>

      </Box>
    
  );
}

export default Footer;