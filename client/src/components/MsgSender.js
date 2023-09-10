import React, { useContext } from "react";
import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import { AppContext } from "../context/ContextAPI";
import { ImagePlus, ArrowUpFromLine } from "lucide-react";
import socket from '../context/socket'

import "../style/style.css";

export default function MsgSender() {
  //************* Using Context *************
  const Users = useContext(AppContext);
  
  const HandleMsgInput = (event) => {
    const { value } = event.target;
    Users.SetMessage(value);
  };

  const HandleMsgSend = () => {
    const newMsg = Users.message;
    const receiver = Users.selectedUserInfo.id;
    const sender =Users.currentUser;
    console.log("Sender is "+Users.currentUser+" Receiver is "+Users.selectedUserInfo.name);

    if (receiver && newMsg) {
      console.log('Sending message:', newMsg);
      socket.emit('send_msg', {sender,receiver, message: newMsg });
      Users.addMessage({ sender:true, text: newMsg });
      Users.SetMessage("");
    }
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
