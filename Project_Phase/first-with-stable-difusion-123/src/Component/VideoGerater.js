import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Skeleton, Typography } from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { getuser } from './Componets/Navbar';
const VideoGenerator = () => {
    const apiKey = process.env.REACT_APP_STABLE_DEFIUSSION_KEY;
    const [inputFile, setInputFile] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const [generatedId, setGeneratedId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [fileName, setFileName] = useState('') // State to store file name
    const userdata = getuser()
    // console.log(userdata.newuser._id)

    const handleChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileType = file.type;
            const acceptedFileTypes = ['image/jpeg', 'image/png'];

            // Validate file format
            if (!acceptedFileTypes.includes(fileType)) {
                setErrorMessage('Only JPEG and PNG formats are allowed.');
                e.target.value = ''; // Reset file input
                return;
            }

            // Validate image dimensions
            const img = new Image();
            img.onload = () => {
                const { width, height } = img;
                const acceptedSizes = [
                    { width: 1024, height: 576 },
                    { width: 576, height: 1024 },
                    { width: 768, height: 768 },
                ];

                const isValidSize = acceptedSizes.some(
                    (size) => width === size.width && height === size.height
                );

                if (!isValidSize) {
                    setErrorMessage(
                        'Invalid image size. Only 1024x576, 576x1024, or 768x768 are allowed.'
                    );
                    e.target.value = ''; // Reset file input
                } else {
                    setInputFile(file);
                    setFileName(file.name); // Set the file name when the file is selected
                    setErrorMessage(''); // Reset error message if the file is valid
                }
            };

            img.onerror = () => {
                setErrorMessage('Unable to read image file.');
                e.target.value = ''; // Reset file input
            };

            img.src = URL.createObjectURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        setVideoUrl('');

        const data = new FormData();
        data.append('image', inputFile);
        data.append('seed', 0);
        data.append('cfg_scale', 1.8);
        data.append('motion_bucket_id', 127);

        try {
            const checkcredit = await axios.post("http://localhost:5000/checkcredit", userdata)
            console.log(checkcredit)
            if (checkcredit.data.mtype === "warning") {
                console.log("error")
                setErrorMessage("Insficiant Credits")
                setLoading(false)
                throw new Error("Insficiant Credits.");
            } else if (checkcredit.data.mtype === "fail") {
                setErrorMessage("Please Login First")
                throw new Error(`Please Login First`);

            }
            const response = await axios.post(
                'https://api.stability.ai/v2beta/image-to-video',
                data,
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            // Check the response status for errors
            if (response.data && response.data.errors) {
                const error = response.data.errors[0];
                setErrorMessage(error); // Display the error message from the response
                return;
            }

            // If everything is successful, set the generated ID
            setGeneratedId(response.data.id);
        } catch (error) {
            console.error('Error submitting form:', error);

            // Check if error has a response object (from Axios)
            if (error.response && error.response.data) {
                const { name, errors } = error.response.data;
                if (errors && errors.length > 0) {
                    const errorMessage = errors[0]; // Take the first error message
                    const truncatedErrorMessage = errorMessage.length > 50 ? errorMessage.slice(0, 50) + '...' : errorMessage;
                    setErrorMessage(truncatedErrorMessage);
                } else {
                    setErrorMessage(`Error: ${name}`);
                }
            } else {
                setErrorMessage(`  ${error.message || 'Unknown error occurred.'}`);
            }
            setLoading(false);

        }

    };

    // Function to fetch the video once the ID is generated
    const fetchVideo = async (generatedId) => {
        try {
            const response = await axios.get(
                `https://api.stability.ai/v2beta/image-to-video/result/${generatedId}`,
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        Accept: 'video/*',
                    },
                    responseType: 'blob',
                }
            );

            if (response.status === 202) {
                setTimeout(() => fetchVideo(generatedId), 10000);
            } else if (response.status === 200) {
                console.log(userdata)
                console.log(generatedId)
                const savethedata = await axios.post("http://localhost:5000/genrateduserdata", { userdata, generatedId });
                const videoBlob = response.data;
                const url = URL.createObjectURL(videoBlob);
                setVideoUrl(url);
                setLoading(false);
            } else {
                setLoading(false);
                throw new Error(`Response ${response.status}: ${response.data.toString()}`);
            }
        } catch (error) {
            setErrorMessage(`Error fetching video: ${error.message}`);
            setLoading(false);

        }
    };

    // Use effect to fetch video once the ID is generated
    React.useEffect(() => {
        if (generatedId) {
            fetchVideo(generatedId);
        }
    }, [generatedId]);

    return (
        <Box
            sx={{
                backgroundColor: "#f3f3f3", 
                width: "100%",
                height: videoUrl || loading ? "110%" : "80vh",
                border: "1px solid black",
                textAlign: "center",
                '@media (max-width: 680px) and (max-height: 670px)': {
                    height: "auto",
                    display: "block",
                }
            }}
        >
            <Box sx={{ padding: '10px', maxWidth: '700px', margin: '0 auto', marginTop: "0" }}>
                <Typography textAlign="center" variant="h5"><h1>Video Generator</h1> </Typography>

                {/* Error message display */}
                {errorMessage && (
                    <Typography color="red" fontWeight="bold">
                        {errorMessage}
                    </Typography>
                )}
                <br />
                {/* Form for file upload */}
                <form onSubmit={handleSubmit} >
                    <input
                        type="file"
                        id="file-upload"
                        style={{ display: 'none' }} // Hide the file input
                        accept="image/jpeg, image/png"
                        onChange={handleChange}
                    />

                    {/* Button as label for the file input */}
                    <Button
                        component="label"
                        htmlFor="file-upload"
                        sx={{
                            padding: '40px 80px',
                            borderRadius: '50px',
                            border: "5px dashed #007bff",
                            color: 'green',
                            fontSize: "20px",
                            fontWeight: "bold",
                            cursor: 'pointer',
                            transition: 'background-color 0.3s, box-shadow 0.3s',
                            "&:hover": {
                                border: "4px dashed grey",
                                borderRadius: '25px',
                            }
                        }}
                        onChange={handleChange}
                    >
                        <div>
                            <AddPhotoAlternateOutlinedIcon sx={{ fontSize: "50px", marginLeft: "0px" }} /> <br />
                            Upload Image
                            {/* Display filename under the upload button */}
                            {fileName && (
                                <Typography sx={{ fontSize: '14px', marginTop: '10px', color: 'black' }}>
                                    {fileName}
                                </Typography>
                            )}
                        </div>
                    </Button>

                    {/* Generate Button */}
                    <Button
                        type="submit"
                        disabled={loading}
                        sx={{
                            marginLeft: '200px',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            border: 'none',
                            backgroundColor: loading ? '#999' : 'green',
                            color: '#fff',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            '&:hover': {
                                backgroundColor: loading ? '#999' : 'lightgreen',
                                color: 'black',
                                boxShadow: "1px 1px 10px 5px green"
                            },
                            '@media (max-width: 650px)': {
                                marginLeft: '0',
                                width: '100%',
                                maxWidth: '300px',
                                marginTop: '20px',
                                borderRadius: '5px',
                                border: 'none',
                                color: '#fff',
                                cursor: loading ? 'not-allowed' : 'pointer',
                            },
                        }}
                    >
                        {loading ? 'Generating...' : 'Generate'}
                    </Button>

                </form>
                <br />

                {loading && (
                    <Box position="relative" width="100%" height={300}>
                        <Skeleton variant="rectangular" width="100%" height={300} animation="wave" sx={{ backgroundColor: "darkgrey", borderRadius:"20px" }} />
                        <Typography
                            variant="h5"
                            align="center"
                            color="lightgrey"
                            sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                        >
                            Please Don't Refresh The Page
                        </Typography>
                    </Box>

                )}

                {/* Video display */}
                {videoUrl && (
                    <Box marginTop={2}>
                        <video controls width="100%">
                            <source src={videoUrl} type="video/mp4" style={{borderRadius:"10px"}}/>
                            Your browser does not support the video tag.
                        </video>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                const a = document.createElement('a');
                                a.href = videoUrl;
                                a.download = 'video.mp4';
                                a.click();
                            }}
                            sx={{ marginTop: '10px' }}
                        >
                            Download Video
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default VideoGenerator;
