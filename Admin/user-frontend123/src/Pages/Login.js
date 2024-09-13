// Login.js
import React, { useState } from 'react';
import { Grid, Box, TextField, Button, Typography, Snackbar, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { Theme } from '../Theme';
import { useTheme } from '@emotion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { loginuser } from '../Store/UserSlice';
import axios from 'axios';
import AlertPopup from '../Component/Aleart/Alertmess';

const Login = () => {
  const theme = useTheme();
  const colors = Theme(theme.palette.mode);
  const [login, setLogin] = useState({ email: '', password: '' });
  const [user, setuser] = useState({ email: '', username: "" });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [alertmessage, setalertmessage] = useState({message:"", severity:"", open:false})

  
  const handleLogin = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1415/logincheck', login);
  
      if (response && response.error) {
        setalertmessage({ message: "Invalid credentials Try Again", severity: "error", open:true });
      } else {
        setalertmessage({ message: "Login Success", severity: "success", open:true });
      }
      const user = response.data;
  
      // Dispatch the user data to Redux store
      await dispatch(loginuser({ user: user }));
  
      if (response.data) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        // Set reload status to true for Navbar
        localStorage.setItem('reloadNavbar', 'true');
  
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setalertmessage({ message: "Login failed. Please try again.", severity: "error", open:true });
    }
  };
  

  return (
    <Grid container spacing={1} direction="column" alignItems="center" justifyContent="center" sx={{ height: '80vh' }}>
      <Box sx={{border: '1.5px solid black', padding: '20px', borderRadius: '8px', textAlign: 'center', background: `linear-gradient(to left, ${colors.primary[6000]}, ${colors.grey[6000]})`,}}>
        <h1>Login</h1>
        <TextField label="Email" variant="outlined" type="email" fullWidth margin="normal" onChange={handleLogin}
          name="email" value={login.email}
        />
        <TextField label="Password" variant="outlined" type="password" fullWidth margin="normal" onChange={handleLogin}
          name="password" value={login.password}
        />
  
        <Button
          variant="contained"
          style={{ backgroundColor: colors.blueAccent[600], color: '#fff' }}
          onClick={handlesubmit}
          sx={{ mt: 2, fontSize: '18px' }}
        >
          Login
        </Button>
  
        <Box>
          <Typography variant="h6">
            Did you Sign Up? - <Link to="/signin" style={{ color: colors.greenAccent[200] }}>SignIn Page</Link>
          </Typography>
        </Box>
  
        {/* Conditionally render AlertPopup */}
        {alertmessage.open && (
          <AlertPopup message={alertmessage.message} severity={alertmessage.severity} open={alertmessage.open}  setOpen={setalertmessage} />
        )}
      </Box>
    </Grid>
  );
  
};

export default Login;
