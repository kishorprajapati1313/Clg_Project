import React, {  useState } from 'react';

const Test = () => {
  const [generationStatus, setGenerationStatus] = useState('pending');
  const [videoUrl, setVideoUrl] = useState('');
  const apiKey = process.env.REACT_APP_STABLE_DEFIUSSION_KEY;

  const handleButtonClick = async () => {
    const generationID = "3299299352e4080718ad47a174fdec45f4c634dd48f2b22c6915c4c9314026ac"; // Replace with your generation ID
    try {
      const response = await fetch(
        `https://api.stability.ai/v2beta/image-to-video/result/${generationID}`,
        {
          method: "GET",
          headers: {
            Accept: "video/*",
            Authorization: `Bearer ${apiKey}`, // Replace with your API key
          },
        }
      );

      if (response.status === 202) {
        console.log("Generation in-progress, try again in 10 seconds.");
      }else if (response.status === 200) {
        console.log("Generation complete!");
        const videoBlob = await response.blob();
        const url = URL.createObjectURL(videoBlob);
        setVideoUrl(url);
        setGenerationStatus('complete');
      } else {
        throw new Error(await response.text());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Generate Video</button>
      {generationStatus === 'complete' && (
        <video controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default Test;
