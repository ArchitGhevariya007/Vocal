import React from "react";
import {
  Modal,
  Box,
  Button,
  Backdrop,
  Typography,
  TextField,
} from "@mui/material";
import { X } from "lucide-react";

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
            border: "1px solid #000",
            boxShadow: 24,
            p: 3,
          }}
          className="AddUserModal"
        >
          <Box
            component="div"
            sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              fontWeight="bold"
              mb={2}
            >
              Add Friend
            </Typography>
            <X class="close-icon" onClick={handleCloseButtonClick} size={18} />
          </Box>

          <TextField
            placeholder="Mobile Number"
            className="SearchBox"
            size="small"
            autoComplete="off"
            InputProps={{
              style: { color: "#ffffff" },
            }}
          />
          <Box sx={{ mt: 2, display: "flex", flexDirection: "row-reverse" }}>
            <Button
              className="Add-User"
              variant="contained"
              sx={{
                backgroundColor: "#2153bf",
                color: "#dfdfdf",
                textTransform: "none",
                ml:1
              }}
            >
              Add
            </Button>
            <Button 
            onClick={handleCloseButtonClick}
            sx={{
              color: "#dfdfdf",
              textTransform: "none",
              ml:1
            }}>
              Cancle</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
