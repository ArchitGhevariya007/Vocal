import React,{useContext,useEffect} from 'react'
import { Box  } from "@mui/material";
import { AppContext } from "../context/ContextAPI";
import socket from '../context/socket'

import "../style/style.css";

export default function ChatContainer() {

  //************* Using Context *************
  const Users = useContext(AppContext);

  useEffect(() => {
    socket.on("receive_msg", (data) => {
      console.log('Received message:', data);
      const {message } = data;
      Users.addMessage({sender:false, text: message}); 
    });

    Users.SetMessage("");
    console.log(Users.chatMessages);
    
    // Clean up the socket event listener when the component unmounts
    return () => {
      socket.off("receive_msg");
    };
    // eslint-disable-next-line
  },[]);


  

  return (
    <>
    <Box className="ChatContainer">
      {Users.chatMessages.map((message, index) => (
        <Box className={"MessageGroup"} key={index}>
        <Box className={`${message.sender  ? 'SenderMsg' : 'ReceiverMsg'}`}>
          <p>{message.text}</p>
        </Box>
        <Box className= {`${message.sender? 'msgSentTime' : 'msgReceiveTime'}`}>
          <p>1.25 PM</p>
        </Box>
      </Box>
    ))}
  </Box>
    </>
  )
}
