import React, { useEffect, useState } from 'react';
import Sidebar from '../../Componets/Sidebar';
import { Grid, Typography, Skeleton, Button, Box } from '@mui/material';
import { getuser } from '../../Componets/Navbar';
import axios from 'axios';

const Profilehistory = () => {
    const [userHistory, setUserHistory] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const users = getuser();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const userid = users.user._id;
                const response = await axios.get(`http://localhost:5000/userimagehistroy/${userid}`);

                setUserHistory(response.data.getuser);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user history:', error);
                setError(true);
            }
        };
        fetchHistory();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    const handleDownload = (imageUrl) => {
        // Create an anchor element
        const anchor = document.createElement('a');
        anchor.href = imageUrl;
        anchor.download = 'image.jpg';
        anchor.click();
    };

    return (
        <div style={{ margin: '20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <Sidebar />
                </Grid>
                <Grid item xs={12} md={9}>
                    <Typography variant='h4' style={{ fontFamily: 'Georgia, serif', textAlign: "center",color:"white" }}>
                        History
                    </Typography>
                    {error && (
                        <Typography variant='h4' style={{color:"white", fontFamily: 'Georgia, serif', textAlign: "center", marginTop: 10 }}>
                            Error fetching images
                        </Typography>
                    )}
                    <Grid container justifyContent="center" style={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}>
                        {loading ? (
                            <>
                                {[...Array(4)].map((_, index) => (
                                    <Grid item xs={12} md={4} key={index} marginLeft="10px">
                                        <Skeleton variant="rectangular" width="100%" height={200} animation="wave" style={{ backgroundColor: "darkgrey", marginTop: "20px" }} />
                                    </Grid>
                                ))}
                            </>
                        ) : (
                            <>
                                {userHistory.map((item, index) => (
                                    <Grid item xs={12} md={4} key={index} marginLeft="10px" >
                                        {/* Render the image */}
                                        {item.image ? (
                                            <Box sx={{marginTop: "20px" ,
                                                position: "relative", height: "55vh", backgroundColor: "grey", cursor: "pointer", '&:hover': {
                                                    backgroundColor: "#69369E",
                                                },
                                            }}>
                                                <img
                                                    src={item.image}
                                                    alt={`Image ${index}`}
                                                    style={{ width: '100%', height: "auto" }}
                                                />
                                                <Box style={{ position: "absolute", bottom: 0, width: "100%", display: "flex", justifyContent: "space-between" }}>
                                                    <Typography variant="subtitle2" color={"white"} sx={{ mt: "10px",ml:1 }}>
                                                    {new Date(item.time).toLocaleString('en-US', {
                                                        year: 'numeric',
                                                        month: '2-digit',
                                                        day: '2-digit',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        second: '2-digit'
                                                    })}
                                                    </Typography>
                                                    <Box>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={() => handleDownload(item.image)} sx={{ marginBottom: "10px", marginRight: "10px" }}
                                                        >
                                                            Download
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        ) : (
                                            <div>Error: Image data not found</div>
                                        )}
                                    </Grid>
                                ))}
                            </>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default Profilehistory;
