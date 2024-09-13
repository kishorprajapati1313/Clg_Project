import React, { useState } from 'react';
import { Typography, Button, TextField, Box } from '@mui/material';
import axios from 'axios';
import FiDownload from '@mui/icons-material/CloudDownloadOutlined';
import { Skeleton } from '@mui/material';
import { getuser } from './Componets/Navbar';

const ImageGenerator = () => {
    const apiKey = process.env.REACT_APP_STABLE_DEFIUSSION_KEY;
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [isHovered, setIsHovered] = useState(false);
    const [error, setError] = useState("");
    const userdata = getuser();

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleChange = (e) => {
        setPrompt(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(""); // Reset the error message

        try {
            const checkcredit = await axios.post("http://localhost:5000/checkcredit", userdata)
            if (checkcredit.data.mtype === "warning") {
                console.log("error")
                setError("Insficiant Credits")
                setLoading(false)
                return 0
            } else if (checkcredit.data.mtype === "fail") {
                setError("Please Login First")
                return 0
            }

            const formData = new FormData();
            formData.append('prompt', prompt);
            formData.append('output_format', 'webp');

            const response = await axios.post(
                `https://api.stability.ai/v2beta/stable-image/generate/core`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            // Check for errors in the response
            if (response.data.errors && response.data.errors.length > 0) {
                const error = response.data.errors[0]; // Access the first error object
                setError(`Error generating image: ${error.message || 'Unknown error occurred.'}`);
            } else if (response.status === 200) {
                const images = response.data.image
                const savedata = await axios.post("/saveimagedata", {userdata, images})
                setImageUrl(response.data.image);
            } else {
                console.error('Error generating image:', response.data);
                setError(`Error generating image: ${response.data.message || 'Unknown error occurred.'}`);
            }
        } catch (error) {
            console.error('Error generating image:', error);
            // Check if the error has a response object (from Axios)
            if (error.response && error.response.data) {
                const { errors } = error.response.data;
                if (errors && errors.length > 0) {
                    setError(`Error: ${errors[0].message || 'Unknown error occurred.'}`);
                } else {
                    setError(`Error: ${error.response.data.message || 'Unknown error occurred.'}`);
                }
            } else {
                setError(`Error generating image: ${error.message || 'Unknown error occurred.'}`);
            }
        } finally {
            setLoading(false);
        }
    };



    const handleDownload = () => {
        const a = document.createElement('a');
        a.href = `data:image/webp;base64,${imageUrl}`;
        a.download = 'generated_image.jpg';
        a.click();
    };

    return (
        <>
            <Box maxWidth={700} mx="auto" p={2} style={{ position: 'relative', height: imageUrl || loading ? "80vh" : "80vh", }} >
                {/* Background image with blur effect */}
                <div className="background" style={{ backgroundColor: "rgba(128, 128, 128, 0.1)", WebkitBackdropFilter: 'blur(8px)' }}></div>

                <Typography variant="h2" sx={{ color: "#F8F8FF" }} gutterBottom>
                    Text To Image Generation
                </Typography>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField
                        label="Enter text here"
                        placeholder="Enter text here"
                        variant="outlined"
                        value={prompt}
                        onChange={handleChange}
                        style={{ marginBottom: '8px' }}
                        sx={{
                            marginBottom: '8px',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'black',
                                    borderRadius: 10
                                },
                                '&:hover fieldset': {
                                    borderColor: 'white',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'lightblue',
                                    color: "black"
                                },
                            },
                            '& .MuiOutlinedInput-input': {
                                color: 'white',
                            },
                            '& .MuiInputLabel-root': {
                                color: 'white',
                            },
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        style={{ alignSelf: 'flex-end', marginBottom: '8px' }}
                        sx={{
                            borderRadius: 15,
                            transition: 'box-shadow 0.3s',
                            backgroundColor: 'darkviolet',
                            color: 'white',
                            '&:hover': {
                                boxShadow: '0 0 10px 4px purple',
                                backgroundColor: 'darkviolet',
                            },
                        }}
                    >
                        {loading ? "Loading..." : "Generate"}
                    </Button>
                </form>
            </Box>
            {error && (
                <Typography variant="body1" style={{ color: 'red', marginBottom: '8px', fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
                    {error}
                </Typography>
            )}

            {loading && (
                <Box
                    style={{ marginTop: "30px", display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -30%)', }}
                >
                    <Skeleton variant="rectangular" width="300px" height="350px"
                        style={{ backgroundColor: '#778899', borderRadius: "10px" }}
                        animation="wave"
                    />
                </Box>
            )}

            {imageUrl && (
                <Box
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-20%, -20%)',
                        maxWidth: '100%',
                        maxHeight: '100%',
                        width: 'auto',
                        height: 'auto',
                        objectFit: 'contain',
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Generated Image */}
                    <img
                        src={`data:image/webp;base64,${imageUrl}`}
                        alt="Generated Image"
                        style={{
                            maxWidth: '40%',
                            maxHeight: '20%',
                            width: 'auto',
                            height: 'auto',
                            objectFit: 'contain',
                        }}
                    />

                    {/* Download button */}
                    {isHovered && (
                        <Button
                            sx={{
                                position: 'absolute',
                                bottom: '10px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                color: 'white',
                                background: '#333333',
                            }}
                            onClick={handleDownload}
                        >
                            <FiDownload style={{ marginRight: '5px' }} />
                            Download
                        </Button>
                    )}
                </Box>
            )}

        </>
    );
};

export default ImageGenerator;
