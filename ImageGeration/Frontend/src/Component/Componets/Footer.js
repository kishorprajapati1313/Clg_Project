import { Box, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  return (
    <Box
      sx={{
        // borderTop:"1px solid black",
        backgroundColor: "#333",
        color: "white",
        display: "flex",
        flexDirection: { xs: 'column', sm: 'row' }, // Change direction based on screen size
        justifyContent: { xs: 'center', sm: 'space-between' }, // Center on small screens, space-between on larger screens
        alignItems: "center",
        padding: "10px",
        textAlign: { xs: 'center', sm: 'left' }, // Center text on small screens, left-align on larger screens
        backgroundColor: "rgba(128, 128, 128, 0.1)" ,backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)'
      }}
    >
      {/* Left section */}
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
        <Typography variant="body2">Contact with Designer:</Typography>
        {/* Add links to Instagram and LinkedIn profiles */}
        <IconButton
          href="https://www.instagram.com/direct/t/115131506542408/"
          target="_blank"
          rel="noopener"
          sx={{ color: "white" }}
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          href=" https://x.com/Ritik80015506?t=pRHZFLOxgVuClyUDKilRaw&s=08"
          target="_blank"
          rel="noopener"
          sx={{ color: "white" }}
        >
          <LinkedInIcon />
        </IconButton>
      </Stack>

      {/* Right section */}
      <Typography variant="body2">
        {/* Add important footer content here */}
        © 2024 By Random Company
      </Typography>
    </Box>
  );
};

export default Footer;
