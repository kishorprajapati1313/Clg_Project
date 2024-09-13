// Navbar.js

import React, { useContext, useEffect, useState } from 'react';
import { ColorModeContext, Theme } from '../Theme';
import { useTheme } from '@emotion/react';
import { Box, Button, Avatar, IconButton, InputBase } from '@mui/material';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginuser, logoutUser } from '../Store/UserSlice'; // Import the logout action
import AssignmentIcon from '@mui/icons-material/Assignment';
import HoemIcon from '@mui/icons-material/HomeOutlined';
import Searched from '../Pages/searched';

export function getuser() {
  let user = localStorage.getItem('user');
  if (user) {
    user = JSON.parse(user);
  } else {
    user = null;
  }
  return user;
}

const Navbar = () => {
  const theme = useTheme();
  const colors = Theme(theme.palette.mode);
  const colormode = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const location = useLocation(); // Get the current location

  useEffect(() => {
    // Execute the logic only if the Navbar is rendered
    if (location.pathname === '/') {
      const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));

      if (userFromLocalStorage) {
        dispatch(loginuser(userFromLocalStorage));
      }
    }
  }, [dispatch, location.pathname]); // Add location.pathname to the dependencies array


  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(logoutUser());
  }

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between" p={2} position="sticky" backgroundColor={colors.primary[6000]} height="10%">
        {/* Logo */}
        <Box display={{ xs: 'none', md: 'block' }}>
          <img src="/logo.jpeg" alt="Logo" width="100px" height="50px" style={{ margin: '0 10px', objectFit: 'cover' }} />
        </Box>

        <Box display="flex" alignItems="center">
          {/* ------------------------------------ Searching --------------------------------------------- */}
          <Searched />

          {/* HOME PAGE */}
          <IconButton component={Link} to={"/"} >
            <HoemIcon />
          </IconButton>

          {/* Theme Toggle */}
          <IconButton onClick={colormode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>

          {/* Shopping Cart */}
          {user && user.user ? (
            <IconButton component={Link} to={`/cart/${user.user._id}`} sx={{ ml: 'auto' }}>
              <ShoppingCartOutlinedIcon />
            </IconButton>
          ) : (
            <IconButton component={Link} to="/login" sx={{ ml: 'auto', mr: '10px' }}>
              <ShoppingCartOutlinedIcon />
            </IconButton>
          )}

          {/* Order Details */}
          {user && user.user ? (
            <IconButton component={Link} to={`/orderstatus/${user.user._id}`} sx={{ mr: '10px' }}>
              <AssignmentIcon />
            </IconButton>
          ) : (
            <IconButton component={Link} to="/login" sx={{ ml: 'auto', mr: '10px' }}>
              <AssignmentIcon />
            </IconButton>
          )}

          {/* Login Button */}
          {/* <IconButton > */}

            {user && user.user ? (
              <Button
                variant="contained"
                style={{ backgroundColor: colors.blueAccent[500], color: 'white' }}
                sx={{ ml: 1, mr: 2 }}
                onClick={handleLogout}
              >
                LogOut
              </Button>
            ) : (
              <Button
                variant="contained"
                style={{ backgroundColor: colors.blueAccent[500], color: 'white' }}
                sx={{ ml: 2, mr: 2 }}
                component={Link}
                to="/login"
              >
                Login
              </Button>
            )}
          {/* </IconButton> */}

          {/* User Avatar */}
          {/* {user && user.user ? <p>{user.user.username}</p> : <p>Loading</p>} */}
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
