import React from "react";
import { Box, TextField } from "@mui/material";
import "../style/style.css";

export default function MsgSender() {
return (
    <>
    <Box className="MsgSenderContainer">
        <TextField
        placeholder="Type a message..."
        className="MsgBox"
        size="small"
        InputProps={{
            style: { color: "#ffffff",backgroundColor: "#1e1f25",borderRadius:"20px"},
        }}
        />
    </Box>
    </>
);
}
