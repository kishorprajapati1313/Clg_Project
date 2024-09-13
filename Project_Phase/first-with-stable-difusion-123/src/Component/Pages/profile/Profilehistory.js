import React, { useEffect, useState } from 'react';
import Sidebar from '../../Componets/Sidebar';
import { Grid, Typography, Skeleton, Button } from '@mui/material';
import { getuser } from '../../Componets/Navbar';
import axios from 'axios';

const Profilehistory = () => {
    const [userhistory, setUserHistory] = useState([]);
    const [error, setError] = useState(false);
    const user = getuser();
    const apiKey = process.env.REACT_APP_STABLE_DEFIUSSION_KEY;
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const userid = user.user._id;
                const response = await axios.get(`http://localhost:5000/gethistroy/${userid}`);
                if (response.data.mtype !== "success") {
                    setError(true);
                } else {
                    setUserHistory(response.data.history);
                }
            } catch (error) {
                console.error('Error fetching user history:', error);
                setError(true);
            }
        };

        fetchHistory();
    }, [user.user._id]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                // Sort user history by time in descending order to get the most recent videos first
                const sortedHistory = [...userhistory].sort((a, b) => new Date(b.time) - new Date(a.time));

                // Get the two most recent videos
                const recentVideos = sortedHistory.slice(0, 4);

                // Fetch videos one by one
                const fetchedVideos = [];
                for (let i = 0; i < recentVideos.length; i++) {
                    const item = recentVideos[i];
                    const response = await axios.get(
                        `https://api.stability.ai/v2beta/image-to-video/result/${item.generatedid}`,
                        {
                            headers: {
                                Authorization: `Bearer ${apiKey}`,
                                Accept: 'video/*',
                            },
                            responseType: 'blob',
                        }
                    );

                    if (response.status === 200) {
                        const videoBlob = response.data;
                        const url = URL.createObjectURL(videoBlob);
                        fetchedVideos.push({ url, time: item.time });
                    }else if (response.status === 404) {
                        throw new Error(`Your Video Time Has Been Expire`);
                       
                    }  else {
                        throw new Error(`Failed to fetch video with ID: ${item.generatedid}`);
                    }
                }
                setVideos(fetchedVideos);
                setLoading(false); // Set loading to false after fetching videos
            } catch (error) {
                console.error('Your Video Time Has Been Expire', error);
                setError(true);
                setLoading(false);
            }
        };

        if (userhistory.length > 0) {
            fetchVideos();
        }
    }, [userhistory, apiKey]);

    return (
        <>
            <div style={{ margin: '20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <Sidebar /> {/* Use the Sidebar component here */}
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Typography variant='h4' style={{ fontFamily: 'Georgia, serif', textAlign: "center" }}>
                            History
                        </Typography>
                        <Typography variant='body1' style={{ fontFamily: 'Georgia, serif', textAlign: "center" }}>
                            Video Will Be automatically remove in 1 day
                        </Typography>
                        {error && (
                            <Typography variant='h4' style={{ fontFamily: 'Georgia, serif', textAlign: "center", marginTop: 10 }}>
                                Your Video Time Has Been Expire
                            </Typography>
                        )}
                        <Grid container spacing={2} justifyContent="center" style={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}>

                            {loading ? (
                                <>
                                    {[...Array(2)].map((_, index) => (
                                        <Grid item xs={12} md={6} key={index}>
                                            <Skeleton variant="rectangular" width="100%" height={200} animation="wave" style={{ backgroundColor: "darkgrey" }} />
                                            <Skeleton variant="text" width="50%" height={40} animation="wave" style={{ backgroundColor: "lightgrey" }} />
                                            <Skeleton variant="rectangular" width="40%" height={40} marginLeft={1} animation="wave" style={{ backgroundColor: "grey" }} />
                                        </Grid>
                                    ))}
                                </>
                            ) : (
                                <>
                                    {videos.map((video, index) => (
                                        <Grid item xs={12} md={6} key={index} marginTop={3} >
                                            <video controls style={{ maxWidth: "100%", height: "auto" }}>
                                                <source src={video.url} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <Typography variant="subtitle1" style={{ marginTop: 10 }}>
                                                    {new Date(video.time).toLocaleString('en-US', {
                                                        year: 'numeric',
                                                        month: '2-digit',
                                                        day: '2-digit',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        second: '2-digit'
                                                    })}
                                                </Typography>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => {
                                                        const a = document.createElement('a');
                                                        a.href = video.url;
                                                        a.download = 'video.mp4';
                                                        a.click();
                                                    }}
                                                    style={{ marginLeft: 10 }}
                                                >
                                                    Download
                                                </Button>
                                            </div>
                                        </Grid>
                                    ))}
                                    
                                </>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default Profilehistory;
