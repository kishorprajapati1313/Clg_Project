import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
export function getuser() {
    let user = localStorage.getItem('userdata');
    // console.log(user)
    if (user) {
        user = JSON.parse(user);
    } else {
        user = null;
    }
    return user;
}

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        if (location.pathname === "/home") {
            const collectuserdata = JSON.stringify(localStorage.getItem("userdata"));
            setUser(collectuserdata)
        }
        const storedUser = JSON.parse(localStorage.getItem('userdata'));
        if (storedUser) {
            setUser(storedUser);
            setIsLoggedIn(true);
        }
    }, [location.pathname]); // Run only once when component mounts

    const handleLogout = () => {
        // Perform logout logic here (e.g., clear localStorage, update state)
        localStorage.removeItem('userdata');
        setUser(null);
        setIsLoggedIn(false);
        navigate("/")
    };

    return (
        <Box sx={{ flexGrow: 1, border:"1px solid grey" }}>
            {/* <AppBar position="static" sx={{ backgroundColor: "grey",height: 'auto' }} >    */}
            <AppBar position="static" sx={{ backgroundColor: "rgba(128, 128, 128, 0.1)" ,backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',height: 'auto' }} >
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <img
                            src="/back11.jpeg"
                            style={{
                                maxHeight: 50, // Set the maximum height of the logo
                                maxWidth: 40,
                                verticalAlign: 'middle',
                                borderRadius:"100px"
                            }}
                            alt="Website Name"
                        /> 

                    </Typography>
                    <Button color="inherit" component={Link} to="/" sx={{
                        "&:active": {
                            boxShadow: "0px 0px 10px 10px white"
                            // Add any other hover styles you want
                        }
                    }}>
                        Home
                    </Button>
                    {user ? (
                        <>
                            <Button color="inherit" onClick={handleLogout} sx={{"&:active": { boxShadow: "0px 0px 10px 10px white"}}}>
                                Logout
                            </Button>
                            <IconButton sx={{ color: 'white',"&:active": { boxShadow: "0px 0px 10px 10px white"} }} component={Link} to="/profile/home">
                                <AccountCircleOutlinedIcon />
                            </IconButton>

                        </>
                    ) : (
                        <Button color="inherit" component={Link} to="/login" sx={{"&:active": { boxShadow: "0px 0px 10px 10px white"}}}>
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;
