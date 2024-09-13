import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Videoui = () => {
    const apiKey = process.env.REACT_APP_STABLE_DEFIUSSION_KEY;
    const [inputfile, setInputFile] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const [generatedId, setGeneratedId] = useState(null);

    const handleChange = (e) => {
        setInputFile(e.target.files[0]);
        setVideoUrl('');

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setVideoUrl('');

        const data = new FormData();
        data.append("image", inputfile);
        data.append("seed", 0);
        data.append("cfg_scale", 1.8);
        data.append("motion_bucket_id", 127);

        try {
            const response = await axios.request({
                url: `https://api.stability.ai/v2beta/image-to-video`,
                method: "post",
                validateStatus: undefined,
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'multipart/form-data',
                },
                data: data,
            });

            console.log("Response:", response);

            setGeneratedId(response.data.id);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    }

    useEffect(() => {
        if (generatedId) {
            fetchVideo(generatedId);
        }
    }, [generatedId]); // Fetch video when generatedId changes
    // eslint-disable-next-line

    const fetchVideo = async (generatedId) => {
        console.log("Fetching video for generated ID:", generatedId);
    
        try {
            const response = await axios.request({
                url: `https://api.stability.ai/v2beta/image-to-video/result/${generatedId}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    Accept: "video/*",
                },
                responseType: 'blob',
            });
    
            console.log("Response:", response);
    
            if (response.status === 202) {
                console.log("Generation is still running, try again in 10 seconds.");
                setTimeout(() => fetchVideo(generatedId), 10000);
            } else if (response.status === 200) {
                console.log("Generation is complete!");
                const videoBlob = response.data;
                const url = URL.createObjectURL(videoBlob);
                setVideoUrl(url);
            } else {
                throw new Error(`Response ${response.status}: ${response.data.toString()}`);
            }
        } catch (error) {
            console.error("Error fetching video:", error);
        }
    }
    

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
            {videoUrl && (
                <video controls>
                    <source src={videoUrl} type="video/mp4" />
                </video>
            )}
        </>
    );
}

export default Videoui;
