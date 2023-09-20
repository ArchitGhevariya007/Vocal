import React, { useContext } from "react";
import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import { AppContext } from "../context/ContextAPI";
import { ImagePlus, ArrowUpFromLine } from "lucide-react";

import "../style/style.css";

export default function MsgSender({socket}) {
  
  //************* Using Context *************
  const Users = useContext(AppContext);
  const currTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const HandleMsgInput = (event) => {
    const { value } = event.target;
    const to = Users.selectedUserInfo.id;
    const from =Users.currentUser;
    const name =Users.selectedUserInfo.name;
    Users.SetMessage(value);
    
    //sending Typing event to server
    if (!Users.isTyping) {
      socket.current?.emit('typing_msg',{to,from,name});
      Users.setIsTyping(true);
    }

    if (Users.typingTimeout) {
      clearTimeout(Users.typingTimeout);
    }
    
    //sending stop Typing event to server
    const newTypingTimeout = setTimeout(() => {
      socket.current?.emit('stop_typing', { to,from });
      Users.setIsTyping(false);
    }, 3000);

    Users.setTypingTimeout(newTypingTimeout);
  };

  // Sending message to server
  const HandleMsgSend = () => {
    const newMsg = Users.message;
    const to = Users.selectedUserInfo.id;
    const from =Users.currentUser;
    const room=Users.selectedUserInfo.roomId;
      if(newMsg){
        socket.current?.emit('send_msg', {room, to, from, message: newMsg }, (response) => {
          if (response.error) {
            console.error('Error sending message:', response.error);
          } else {
            console.log('Message sent successfully:', response.message);
            Users.addMessage({ sender: true, text: newMsg,time:currTime });
            Users.SetMessage('');
          }
        });
      }
  };

  const HandleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      HandleMsgSend();
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
          onKeyDown={HandleEnterKeyPress}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <ImagePlus size="18" className="AttachIcon" />
                </IconButton>
                <IconButton onClick={HandleMsgSend} >
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
