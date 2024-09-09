import React, { useState } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';

const Imageui = () => {
  const [imageVisible, setImageVisible] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic for generating image with the provided text
    setImageVisible(true);
  };

  return (
    <Box maxWidth={400} mx="auto" p={2}>
      <Typography variant="h4" gutterBottom>
        Text To Image Generation
      </Typography>
      <Typography variant="subtitle1">
        You can Generate Image with Prompt
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          margin="normal"
          placeholder="Enter text here"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            transition: 'box-shadow 0.3s',
            boxShadow: '0 0 0 rgba(0, 123, 255, 0)', // Initial boxShadow
            '&:hover': {
              boxShadow: '0 0 10px 4px rgba(0, 123, 255, 0.5)', // Hover boxShadow
            },
            alignSelf: 'flex-end',
          }}
        >
          Generate
        </Button>
      </form>
     
    </Box>
  );
};

export default Imageui;
