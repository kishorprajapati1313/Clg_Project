// VideoGenerator.js
import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Skeleton, Typography } from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { handleSubmit } from './Exptrnalfunction';
import { fetchVideo } from './Exptrnalfunction';
import { handleFileUpload } from './Exptrnalfunction';

const Video = () => {
    const apiKey = process.env.REACT_APP_STABLE_DEFIUSSION_KEY;
    const [inputFile, setInputFile] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const [generatedId, setGeneratedId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [fileName, setFileName] = useState('');

    const handleChange = (e) => handleFileUpload(e, setInputFile, setFileName, setErrorMessage, apiKey);

    const submitHandler = (e) => handleSubmit(e, inputFile, setLoading, setErrorMessage, setGeneratedId, apiKey, setVideoUrl);

    React.useEffect(() => {
        if (generatedId) {
            setVideoUrl(fetchVideo(generatedId, setVideoUrl, setLoading, setErrorMessage));
        }
    }, [generatedId]);

    return (
        <Box sx={{ backgroundColor: "#f3f3f3", width: "100%", border: "1px solid black" }}>
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
                <form onSubmit={submitHandler}>
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
                            < AddPhotoAlternateOutlinedIcon sx={{ fontSize: "50px", marginLeft: "50px" }} /> <br />
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
                            "&:hover": {
                                backgroundColor: loading ? '#999' : 'lightgreen',
                                color: "black",
                                boxShadow: "1px 1px 10px 5px green"
                            }
                        }}
                    >
                        {loading ? 'Generating...' : 'Generate'}
                    </Button>
                </form>
                <br />
                <Box height={videoUrl ?"auto" :"250px"} border="1px solid black">
                    {loading && (
                        <Skeleton variant="rectangular" width="100%" height={300} animation="wave" sx={{ backgroundColor: "darkgrey" }} />
                    )}

                    {/* Video display */}
                    {videoUrl && (
                        <Box marginTop={2}>
                            <video controls width="100%">
                                <source src={videoUrl} type="video/mp4" />
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
        </Box>
    );
};

export default Video;
