import React from "react";
import { Box, TextField,InputAdornment,IconButton  } from "@mui/material";
import { Send } from "lucide-react";

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
            endAdornment: (
                <InputAdornment position="end">
                <IconButton>
                    <Send size="18" className="sendIcon"/>
                </IconButton>
                </InputAdornment>
            ),
            style: { color: "#ffffff",backgroundColor: "#1e1f25",borderRadius:"20px",padding:"7px"},
        }}
        />
    </Box>
    </>
);
}
