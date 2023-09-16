import React, { useContext } from "react";
import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import { AppContext } from "../context/ContextAPI";
import { ImagePlus, ArrowUpFromLine } from "lucide-react";

import "../style/style.css";

export default function MsgSender({socket}) {
  
  //************* Using Context *************
  const Users = useContext(AppContext);
  
  //Handling message Input
  const HandleMsgInput = (event) => {
    const { value } = event.target;
    Users.SetMessage(value);
  };

  // Sending message to server
  const HandleMsgSend = () => {
    const newMsg = Users.message;
    const to = Users.selectedUserInfo.id;
    const from =Users.currentUser;

      socket.current.emit('send_msg', {to,from, message: newMsg }, (response) => {
        if (response.error) {
          console.error('Error sending message:', response.error);
        } else {
          console.log('Message sent successfully:', response.message);
          Users.addMessage({ sender: true, text: newMsg });
          Users.SetMessage('');
        }
      });
  };
  
  return (
    <>
      <Box className="MsgSenderContainer">
        <TextField
          name="msg"
          placeholder="Type a message..."
          className="MsgBox"
          autoComplete="off"
          size="small"
          value={Users.message}
          onChange={HandleMsgInput}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <ImagePlus size="18" className="AttachIcon" />
                </IconButton>
                <IconButton onClick={HandleMsgSend}>
                  <ArrowUpFromLine
                    size="18"
                    className="sendIcon"
                    color="#296eff"
                  />
                </IconButton>
              </InputAdornment>
            ),
            style: {
              color: "#ffffff",
              backgroundColor: "#1e1f25",
              borderRadius: "13px",
              padding: "7px",
            },
          }}
        />
      </Box>
    </>
  );
}
