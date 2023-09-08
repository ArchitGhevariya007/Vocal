import React, { useContext, useEffect } from "react";
import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import { AppContext } from "../context/ContextAPI";
import { ImagePlus, ArrowUpFromLine } from "lucide-react";
import { io } from "socket.io-client";

import "../style/style.css";

// const socket = io("http://localhost:5001",{  
//   withCredentials: true,
// });

export default function MsgSender() {
  //************* Using Context *************
  const Users = useContext(AppContext);

  const socket = io("http://localhost:5001", { withCredentials: true });

  useEffect(() => {  
    return () => {
      socket.disconnect();
    };
  }, [socket]);
  
  const HandleMsgInput = (event) => {
    const { value } = event.target;
    Users.SetMessage(value);
  };


  const HandleMsgSend = () => {
    const newMsg = Users.message;
    const receiver = Users.selectedUser;
    const sender =Users.selectedUserInfo.senderId;

    if (receiver && newMsg) {
      socket.emit('send_msg', {sender,receiver, message: newMsg });
      Users.addMessage({ sender:true, text: newMsg });
      Users.SetMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_msg", (data) => {
      console.log('Received message:', data);
      const {message } = data;
      Users.addMessage({sender:false, text: message}); 
    });
    
    // Users.SetMessage("");
    console.log(Users.chatMessages);

    // eslint-disable-next-line
  },[]);
  
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
