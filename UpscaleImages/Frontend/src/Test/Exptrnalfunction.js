import axios from 'axios';
// Exptrnalfunction.js
import { setVideoUrl } from './Video'; 
// handleFileUpload.js
export const handleFileUpload = (e, setInputFile, setFileName, setErrorMessage, apiKey) => {
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

// handleSubmit.js
export const handleSubmit = async (e, inputFile, setLoading, setErrorMessage, setGeneratedId, apiKey, setVideoUrl) => {
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
            setErrorMessage(`Error submitting form: ${error.message || 'Unknown error occurred.'}`);
        }
    }

    finally {
        setLoading(false);
    }
};


// fetchVideo.js
export const fetchVideo = async (generatedId, setVideoUrl, setLoading, setErrorMessage, apiKey) => {
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
