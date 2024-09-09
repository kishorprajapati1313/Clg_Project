import { Box, Button, Container, Grid, Skeleton, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import FiDownload from '@mui/icons-material/CloudDownloadOutlined';
import axios from 'axios';

const Upscale = () => {
    const apiKey = process.env.REACT_APP_STABLE_DEFIUSSION_KEY;
    const [promptData, setPromptData] = useState({ prompt: "", image: null });
    const [generatedid, setgeneratedid] = useState("")
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [imageurl, setimageurl] = useState("")
    // setgeneratedid("e19bbc85f0f7d8ebccc08e2231efa90f4fd48d12c4a5c5b2f429467b63764cef")
    // Function to handle changes in input fields
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        // If the input is a file, update image state with selected file
        if (name === 'image') {
            setPromptData({ ...promptData, image: files[0] });
        } else {
            setPromptData({ ...promptData, [name]: value });
        }

    }

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate input before submission
        // if (!promptData.prompt || !promptData.image) {
        //     setError("Please provide both input prompt and image.");
        //     return;
        // }

        // const formData = {
        //     image: promptData.image,
        //     prompt: promptData.prompt,
        //     output_format: "png"
        // };

        // const response = await axios.postForm(
        //     `https://api.stability.ai/v2beta/stable-image/upscale/creative`,
        //     axios.toFormData(formData, new FormData()),
        //     {
        //         validateStatus: undefined,
        //         headers: {
        //             Authorization: `Bearer ${apiKey }`
        //         },
        //     },
        // );


        // console.log("Generation ID:", response.data.id);
        // setgeneratedid(response.data.id)
        // setLoading(true);
        // Max:2048 x 512    Min:  64 x 64
        fetchimage()

    }

    const fetchimage = async (generatedid) => {
        const genrateid = "432887c7bc99fe56ebd6477fed4e6df149d17fc9652bce8d7b1ea9f47293f868";

        const responseOfImage = await axios.get(
            `https://api.stability.ai/v2beta/stable-image/upscale/creative/result/${genrateid}`,
            {
                validateStatus: undefined,
                responseType: "arraybuffer",
                headers: {
                    Accept: "image/*",
                    'authorization': `Bearer ${apiKey}`,
                },
            }
        );

        if (responseOfImage.status === 202) {
            setTimeout(() => fetchimage(genrateid), 10000);
        } else if (responseOfImage.status === 200) {
            const base64Data = btoa(
                new Uint8Array(responseOfImage.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );

            // Now you can use the base64Data to display the PNG image in your application
            setimageurl(`data:image/png;base64,${base64Data}`);
            console.log(imageurl)
            setLoading(false);
        } else {
            setLoading(false);
            throw new Error(`Response ${responseOfImage.status}: ${responseOfImage.data.toString()}`);
        }

        console.log(responseOfImage);

    }

    // React.useEffect(() => {
    //     if (generatedid) {
    //         fetchimage(generatedid);
    //     }
    // }, [generatedid]);

    return (
        <>
            <Container>
                <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h4" gutterBottom color="white">
                        Image Upscaler
                    </Typography>
                    {/* Error message */}
                    {error && (
                        <Typography sx={{ color: 'red', marginTop: '8px', marginBottom: "8px", textAlign: "Left", fontSize: "20px" }}>{error}</Typography>
                    )}
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ marginBottom: 2 }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Input Prompt"
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
                                {/* Input file button */}
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
                                {/* Submit button */}
                                <Button
                                    type="submit"
                                    sx={{
                                        height: "5vh",
                                        width: "18vh",
                                        borderRadius: '50px',
                                        border: 'none',
                                        backgroundColor: loading ? 'darkblue' : 'blue',
                                        color: '#fff',
                                        cursor: 'pointer',
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        '&:hover': {
                                            backgroundColor: loading ? 'darkblue' : 'blue',
                                            color: 'white',
                                            boxShadow: "1px 1px 10px 5px blue"
                                        },
                                    }}
                                    disabled={loading} // Disable button during loading
                                >
                                    {loading ? 'Generating...' : 'Generate'}
                                </Button>

                            </Grid>
                        </Grid>
                    </form>
                    {/* Display selected image */}
                    {promptData.image && !loading && (
                        <Box sx={{ mt: 2 }}>
                            <img src={URL.createObjectURL(promptData.image)} alt="Selected" style={{ maxWidth: '30%' }} />
                        </Box>
                    )}
                    {loading && (
                        <Box sx={{ mt: 2 }}>
                            <Skeleton variant='rectangular' borderRadius="10px" />
                        </Box>
                    )}
                    {imageurl && (
                        <Box sx={{ mt: 2, position: 'relative' }}>
                            <img src={imageurl} alt="Selected" style={{ maxWidth: '30%' }} />
                            <Button
                                sx={{
                                    position: 'absolute',
                                    top: '5px',
                                    left: '50%',
                                    transform: 'translateX(120%)',
                                    color: 'black',

                                }}
                            >
                                <FiDownload sx={{ color: "white", fontSize: "30px" }}
                                    onClick={() => {
                                        const link = document.createElement('a');
                                        link.href = imageurl;
                                        link.download = 'image.png'; // Set the desired filename here
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

export default Upscale;
