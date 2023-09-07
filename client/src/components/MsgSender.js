import React, { useContext, useEffect } from "react";
import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import { AppContext } from "../context/ContextAPI";
import { ImagePlus, ArrowUpFromLine } from "lucide-react";
import { io } from "socket.io-client";

import "../style/style.css";

const socket = io("http://localhost:5003",{  
  withCredentials: true,
});

export default function MsgSender() {
  //************* Using Context *************
  const Users = useContext(AppContext);

  const HandleMsgInput = (event) => {
    const { value } = event.target;
    Users.SetMessage(value);
  };

  useEffect(() => {
    socket.on("privateMessage", (data) => {
      console.log('Received message:', data);
      const { sender, message } = data;
      Users.addMessage({ text: message, sender:false}); 
    });
    
    Users.SetMessage("");
    console.log(Users.chatMessages);
    // eslint-disable-next-line
  },[Users.chatMessages]);


  const HandleMsgSend = () => {
    const newMsg = Users.message;
    Users.SetMessage("");
    const receiver = Users.selectedUser;
    Users.addMessage({ text: newMsg, sender: true });
    socket.emit('privateMessage', {sender:Users.selectedUserInfo.senderId,receiver,message:newMsg});
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
