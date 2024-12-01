import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';

const LoginPromptDialog = ({ open, setOpen, onLogin, setShowLoginDialog }) => {
  
  const handleClose = () => {
    setOpen(false); // Close the dialog
  };

  const handleLogin = () => {

    onLogin();   // Trigger the login process
    setShowLoginDialog(true);
    setOpen(false); // Close the dialog after login
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="login-dialog-title">
      <DialogTitle id="login-dialog-title">Login Required</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          You need to be logged in to place an order. Please log in to continue.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleLogin} color="primary" variant="contained">
          Log In
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginPromptDialog;
