import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const AlertPopup = ({ message, severity, open, setOpen }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <MuiAlert elevation={6} variant="filled" severity={severity} onClose={handleClose} sx={{ mt: "60px" }}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default AlertPopup;
