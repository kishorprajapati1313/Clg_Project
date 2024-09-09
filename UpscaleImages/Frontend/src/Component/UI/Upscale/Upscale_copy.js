import { Box, Button, Container, Grid, Skeleton, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import FiDownload from '@mui/icons-material/CloudDownloadOutlined';
import axios from 'axios';

const Upscalecs = () => {
    const apiKey = process.env.REACT_APP_STABLE_DEFIUSSION_KEY;
    const [promptData, setPromptData] = useState({ prompt: "", image: null });
    const [generatedid, setGeneratedId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [imageurl, setImageUrl] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            const img = files[0];
            // Validate image dimensions
            const imgWidth = img.width;
            const imgHeight = img.height;
            if (imgWidth * imgHeight > 1048576) {
                setError("Please choose image ration like 1024 x 1024 or 2048 x 512");
                return;
            }
            setPromptData({ ...promptData, image: img });
        } else {
            setPromptData({ ...promptData, [name]: value });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")
        if (!promptData.prompt || !promptData.image) {
            setError("Please provide both input prompt and image.");
            return;
        }

        const formData = new FormData();
        formData.append('image', promptData.image);
        formData.append('prompt', promptData.prompt);
        formData.append('output_format', 'png');

        try {
            const response = await axios.post(
                `https://api.stability.ai/v2beta/stable-image/upscale/creative`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`
                    },
                },
            );
            setGeneratedId(response.data.id);
            setLoading(true);
        } catch (error) {
            console.error("Error submitting form:", error);
            setLoading(false);
            setError("An error occurred while processing your request. Please try again later.");
        }

    }

    const fetchImage = async (generatedId) => {
        // const generat = "2119ca463e34fb22b4a3e5939763e260fefbc97a0dbfe87d0481f0353b06fff8"
        try {
            const response = await axios.get(
                `https://api.stability.ai/v2beta/stable-image/upscale/creative/result/${generatedId}`,
                {
                    validateStatus: undefined,
                    responseType: "arraybuffer",
                    headers: {
                        Accept: "image/*",
                        'authorization': `Bearer ${apiKey}`,
                    },
                }
            );

            if (response.status === 202) {
                setTimeout(() => fetchImage(generatedId), 10000);
            } else if (response.status === 200) {
                const base64Data = btoa(
                    new Uint8Array(response.data)
                        .reduce((data, byte) => data + String.fromCharCode(byte), '')
                );

                setImageUrl(`data:image/png;base64,${base64Data}`);
                console.log(imageurl);
                setLoading(false);
            } else {
                setLoading(false);
                throw new Error(`Response ${response.status}: ${response.data.toString()}`);
            }
        } catch (error) {
            console.error("Error fetching image:", error);
            setLoading(false);
            setError("An error occurred while fetching the image. Please try again later.");
        }
    }

    React.useEffect(() => {
        if (generatedid) {
            fetchImage(generatedid);
        }
    }, [generatedid]);

    return (
        <>
            <Container>
                <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h4" gutterBottom color="white">
                        Image Upscaler
                    </Typography>
                    {error && (
                        <Typography sx={{ color: 'red', marginTop: '8px', marginBottom: "8px", textAlign: "Left", fontSize: "20px" }}>{error}</Typography>
                    )}
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ marginBottom: 2 }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Enter Prompt"
                                name="prompt"
                                value={promptData.prompt}
                                onChange={handleChange}
                                sx={{
                                    marginBottom: '8px',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'white',
                                            borderRadius: 10
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'lightblue',
                                            color: "white"
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
                        </Box>
                        <Grid container spacing={2}>
                            <Grid item xs={9} sx={{ ml: "300px", textAlign: "right" }}>
                                <label htmlFor="file-upload">
                                    <input
                                        type="file"
                                        id="file-upload"
                                        style={{ display: 'none' }}
                                        accept="image/jpeg, image/png"
                                        name="image"
                                        onChange={handleChange}
                                    />
                                    <Button component="span" sx={{ color: "lightGreen", fontSize: "10px" }}>
                                        <AddPhotoAlternateOutlinedIcon sx={{ fontSize: "35px", "&:hover": { color: "black" } }} />
                                    </Button>
                                </label>
                                <Button
                                    type="submit"
                                    sx={{
                                        height: "5vh",
                                        width: "18vh",
                                        borderRadius: '50px',
                                        border: 'none',
                                        backgroundColor: loading ? 'darkblue' : 'blue',
                                        color: '#fff',
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        '&:hover': {
                                            backgroundColor: loading ? 'darkblue' : 'blue',
                                            color: 'white',
                                            boxShadow: "1px 1px 10px 5px blue"
                                        },
                                    }}
                                    disabled={loading}
                                >
                                    {loading ? 'Generating...' : 'Generate'}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    {promptData.image && !loading && (
                        <Box sx={{ mt: 2 }}>
                            <img src={URL.createObjectURL(promptData.image)} alt="Selected" style={{ maxWidth: '30%' }} />
                        </Box>
                    )}
                    {loading && (
                        <Box sx={{ mt: 2 }}>
                            <Skeleton variant="rectangular" width="300px" height="350px"
                                style={{ backgroundColor: '#778899', borderRadius: "10px" }} animation="wave" />
                        </Box>
                    )}
                    {imageurl && (
                        <Box sx={{ mt: 2, position: 'relative' }}>
                            <img src={imageurl} alt="Selected" style={{ maxWidth: '30%', cursor:"pointer", }} />
                            <Button
                                sx={{
                                    position: 'absolute',
                                    top: '5px',
                                    left: '50%',
                                    transform: 'translateX(150%)',
                                    color: 'black',
                                    
                                }}
                               
                            >
                                <FiDownload sx={{ color: "white", fontSize: "30px" }} onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = imageurl;
                                    link.download = 'image.png';
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                }} />
                            </Button>
                        </Box>
                    )}
                </Box>
            </Container>
        </>
    )
}

export default Upscalecs;
