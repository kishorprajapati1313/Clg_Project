import React, { useState } from 'react';
import { Typography, Button, Box, TextField } from '@mui/material';

{/* <img src={`data:image/webp;base64,${imageUrl}`} alt="Generated" height="100px" width="100px" /> */}
const Itestui = () => {
    const [imageVisible, setImageVisible] = useState(false);
    const [content, setContent] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Logic for generating image with the provided text
        setImageVisible(true);
    };

    return (
        <>
            <Box maxWidth={700} mx="auto" p={2} 
                style={{
                    position: 'relative', // Ensure relative positioning for the container
                }}
            >
                {/* Background image with blur effect */}
                <div className="background"></div>

                <Typography variant="h2" sx={{ color: "#F8F8FF" }} gutterBottom>
                    Text To Image Generation
                </Typography>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField
                        label="Enter text here"
                        placeholder="Enter text here"
                        variant="outlined"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={{ marginBottom: '8px' }}
                        sx={{
                            marginBottom: '8px',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white', // Border color
                                    borderRadius:10
                                },
                                '&:hover fieldset': {
                                    borderColor: 'white', // Border color on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'white', // Border color when focused
                                },
                            },
                            '& .MuiOutlinedInput-input': {
                                color: 'white', // Text color
                            },
                            '& .MuiInputLabel-root': {
                                color: 'black', // Label color
                            },
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ alignSelf: 'flex-end' }}
                        sx={{
                            borderRadius: 15,
                            transition: 'box-shadow 0.3s',
                            backgroundColor: 'darkviolet', // Set background color to purple
                            color: 'white', // Set text color to white
                            '&:hover': {
                                boxShadow: '0 0 10px 4px purple', // Hover boxShadow (optional)
                                backgroundColor: 'darkviolet', // Change background color on hover (optional)
                            },
                        }}
                    >
                        Generate
                    </Button>

                </form>

                {/* Generated image */}
            </Box>
            {imageVisible && (
                <img
                    src="/1.png"
                    alt="Generated Image"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -20%)',
                        maxWidth: '80%',
                        maxHeight: '50%',
                        width: 'auto',
                        height: 'auto',
                        objectFit: 'contain',
                    }}
                />
            )}

        </>
    );
};

export default Itestui;
