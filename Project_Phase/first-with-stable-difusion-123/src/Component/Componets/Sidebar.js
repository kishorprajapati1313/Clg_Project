import React, { useState } from 'react';
import { Drawer, Paper, Typography, List, ListItem, ListItemText, IconButton, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useMediaQuery } from '@mui/material';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:900px)');

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const sidebarContent = (
    <Paper sx={{ backgroundColor: '#f0f0f0', minHeight: "100vh" }}>
      <Typography variant="h6" gutterBottom sx={{ fontSize: '1.5rem', marginBottom: '1rem', padding: '1rem' }}>
        Sidebar
      </Typography>
      <Divider />
      <List component="nav">
        <ListItem button component={Link} to={"/profile/home"}>
          <ListItemText primary="My Account" />
        </ListItem>
        <ListItem button component={Link} to={"/profile/history"}>
          <ListItemText primary="History" />
        </ListItem>
        <ListItem button component={Link} to={"/profile/bill"}>
          <ListItemText primary="Billing" />
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
