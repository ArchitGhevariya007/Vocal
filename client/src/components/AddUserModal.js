import React from "react";
import { Modal, Box, Button, Backdrop } from "@mui/material";

export default function AddUserModal({ open, handleClose }) {

    const handleCloseButtonClick = () => {
        handleClose();
      };
      
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <p id="modal-modal-title" variant="h6" component="h2">
            Modal Title
          </p>
          <p id="modal-modal-description" sx={{ mt: 2 }}>
            This is the modal content. You can customize this area with your own
            content.
          </p>
          <Button onClick={handleCloseButtonClick}>Close Modal</Button>
        </Box>
      </Modal>
    </>
  );
}
