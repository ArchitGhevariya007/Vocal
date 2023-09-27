import React, { useContext,useRef } from "react";
import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import { AppContext } from "../context/ContextAPI";
import { ImagePlus, ArrowUpFromLine } from "lucide-react";
// import { google } from 'googleapis';

import "../style/style.css";
import ImagePreviewModal from "./ImagePreviewModal";

export default function MsgSender({socket}) {
  
  //************* Using Context *************
  const Users = useContext(AppContext);
  const fileInputRef = useRef(null);

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
    
    // sending Typing event to server
    if (!Users.isTyping) {
      socket.current?.emit('typing_msg',{to,from,name});
      Users.setIsTyping(true);
    }

    if (Users.typingTimeout) {
      clearTimeout(Users.typingTimeout);
    }
    
    // sending stop Typing event to server
    const newTypingTimeout = setTimeout(() => {
      socket.current?.emit('stop_typing', { to,from });
      Users.setIsTyping(false);
    }, 3000);

    Users.setTypingTimeout(newTypingTimeout);
  };

  // Sending text message to server
  const HandleMsgSend = () => {
    const newMsg = Users.message;
    const to = Users.selectedUserInfo.id;
    const from =Users.currentUser;
    const room=Users.selectedUserInfo.roomId;
    const contentType="text";
      if(newMsg){
        socket.current?.emit('send_msg', {room, to, from, message: newMsg,contentType }, (response) => {
            console.log('Message sent successfully:', response.message);
            Users.addMessage({ sender: true,contentType: "text", text: newMsg,time:currTime });
            Users.SetMessage('');
        });
      }
  };

  // sending message on enter
  const HandleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      HandleMsgSend();
    }
  };


  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  // handling image input
  const handleFileInputChange =async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target.result;
        Users.setSelectedImage(base64String);
        Users.setIsModalOpen(true);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  //closing image preview modal
  const closeModal = () => {
    Users.setSelectedImage(null);
    Users.setIsModalOpen(false);
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
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileInputChange}
                />
                <IconButton onClick={handleImageUpload}>
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

      {/* Image preview modal */}
      <ImagePreviewModal open={Users.isModalOpen} close={closeModal} socket={socket}/>

    </>
  );
}
