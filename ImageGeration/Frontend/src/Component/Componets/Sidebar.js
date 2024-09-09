import React, { useState } from 'react';
import { Drawer, Paper, Typography, List, ListItem, ListItemText, IconButton, Divider, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useMediaQuery } from '@mui/material';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:650px)');

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const sidebarContent = (
    <Paper  sx={{ backgroundColor: "purple" ,backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', minHeight: "100vh", color:"white", borderBottom: '2px solid white' }}>
      <Box borderBottom="1px solid black">
      <Typography variant="h6" gutterBottom sx={{ fontSize: '2rem', marginBottom: '1rem', padding: '1rem', }}  >
        Sidebar
      </Typography>
      </Box>
      <Divider border="10px solid black" />
      <List component="nav">
        <ListItem button component={Link} to={"/profile/home"}>
          <ListItemText primary="My Account" sx={{ borderBottom: '1px solid black', borderRadius: '5px', padding: '10px', }} />
        </ListItem>
        <ListItem button component={Link} to={"/profile/history"}>
          <ListItemText primary="History"  sx={{ borderBottom: '1px solid black', borderRadius: '5px', padding: '10px', }}/>
        </ListItem>
        <ListItem button component={Link} to={"/profile/bill"}>
          <ListItemText primary="Billing" sx={{  borderBottom: '1px solid black', borderRadius: '5px', padding: '10px' }} />
        </ListItem>
      </List>
    </Paper>
  );

  return (
    <>
      {isMobile ? (
        <IconButton onClick={toggleDrawer} sx={{ ml: 'auto', mr: 1 }}>
          {open ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      ) : null}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: '250px'
          }
        }}
      >
        {sidebarContent}
      </Drawer>
      {!isMobile && sidebarContent}
    </>
  );
};

export default Sidebar;
