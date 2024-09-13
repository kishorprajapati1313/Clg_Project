import React, { useState } from 'react';
import { Box, Button, Link, TextField, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const Sign = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [errors, setErrors] = useState({ username: '', email: '', password: '' });
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
        const { username, email, password } = formData;
        let isValid = true;

        if (!username.trim() || username.trim().length < 5) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                username: 'Username must be at least 5 characters',
            }));
            isValid = false;
        }

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

        if (!password.trim() || password.trim().length < 8) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: 'Password must be at least 8 characters',
            }));
            isValid = false;
        }

        if (isValid) {
            try {
                // Handle form submission (e.g., login API call)
                const response = await axios.post("http://localhost:5000/signin", formData);
                const user = response.data
                if (response.data.messageType !== "success") {
                    setresponseerror(response.data.message)

                }
                else {
                    setresponseerror(response.data.message);
                    localStorage.setItem("userdata", JSON.stringify(user));
                    navigate("/home"); 
                }
                console.log('Form submitted:', formData);
            } catch {

            }

        }
    };

    return (
        <Box sx={{ minHeight: '75vh' }}>
            <Box
                sx={{
                    maxWidth: 400,
                    margin: 'auto',
                    mt: isSmallScreen ? 2 : 8,
                    border: '1px solid black',
                    padding: isSmallScreen ? 2 : 3,
                }}
            >
                <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
                    Sign In
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        error={Boolean(errors.username)}
                        helperText={errors.username}
                    />
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
                    />
                    <Typography variant='body1' color="red">
                        <div>
                            {responseerror}
                        </div>

                    </Typography>
                    <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                        Create account

                    </Button>
                </form>
                <Box sx={{ mt: 2 }}>
                   
                    <br />
                    Not Registered Yet?
                    <Link href="/login" color="primary">
                        LOG IN
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default Sign;
