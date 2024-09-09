import React, { useState } from 'react';
import { Box, Button, Link, TextField, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [responseerror, setresponseerror] = useState("")
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Reset error message when user starts typing
        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate form fields
        const { email, password } = formData;
        let isValid = true;

        if (!email.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: 'Email is required',
            }));
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: 'Invalid email format',
            }));
            isValid = false;
        }

        // if (!password.trim() || password.trim().length < 2) {
        //     setErrors((prevErrors) => ({
        //         ...prevErrors,
        //         password: 'Password must be at least 8 characters',
        //     }));
        //     isValid = false;
        // }

        if (isValid) {
            try {
                // Handle form submission (e.g., login API call)
                const response = await axios.post("http://localhost:5000/login", formData);
                const user = response.data

                if (response.data.messageType !== "success") {
                    setresponseerror(response.data.message)
                }
                else {
                    setresponseerror(response.data.message);
                    localStorage.setItem("userdata", JSON.stringify(user));
                    navigate("/home");
                }

            } catch {

            }

        }
    };

    return (
        <Box sx={{ minHeight: '75vh' }}>
            <Box
                sx={{
                    background:"#7951A8" ,backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                    maxWidth: 400,
                    margin: 'auto',
                    mt: isSmallScreen ? 2 : 8,
                    border: '1px solid black',
                    padding: isSmallScreen ? 2 : 3,
                }}
            >
                <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', color:"white" }}>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                        sx={{
                            '& .MuiOutlinedInput-input': {
                                color: 'white',
                            },
                            '& .MuiInputLabel-root': {
                                color: 'white',
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white', // Border color
                                },'&:hover fieldset': {
                                    borderColor: 'white', // Hover border color
                                },
                            }
                        }}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                        sx={{
                            '& .MuiOutlinedInput-input': {
                                color: 'white',
                            },
                            '& .MuiInputLabel-root': {
                                color: 'white',
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white', // Border color
                                },'&:hover fieldset': {
                                    borderColor: 'white', // Hover border color
                                },
                            }
                        }}
                    />
                    <Typography variant='body1' color="red">
                        <div>
                            {responseerror}
                        </div>

                    </Typography>
                    <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                        LOGIN
                    </Button>
                </form>
                <Box sx={{ mt: 2 , color:"white"}}>
                    <Link href="/forgot" color="textSecondary" sx={{ mr: 1, color:"white" }}>
                        Forgot password?
                    </Link>
                    <br />
                    Not Registered Yet?
                    <Link href="/sign" color="primary" sx={{color:"lightblue", ml:1}}>
                        Create account

                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;
