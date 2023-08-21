import React from "react";
import { Modal,Box,Button } from "@mui/material";

export default function AddUserModal(open,handleClose) {
    return (
        <>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
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
            <Button onClick={handleClose}>Close Modal</Button>
            </Box>
        </Modal>
        </>
    );
}
