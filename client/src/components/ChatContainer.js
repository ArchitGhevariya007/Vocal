import React,{useContext,useEffect,useRef } from 'react'
import { Box  } from "@mui/material";
import { AppContext } from "../context/ContextAPI";

import "../style/style.css";

export default function ChatContainer({socket}) {

  //************* Using Context *************
  const Users = useContext(AppContext);

  const scrollRef = useRef();


  // Receiving messages from
  useEffect(() => {
    console.log(socket.current)
    if(socket.current){
      socket.current.on("receive_msg", (data) => {
        console.log('Received message:', data);
        const {message} = data;
        if(data.from===Users.selectedUser){
          Users.addMessage({sender:false, text: message}); 
        }
      });
  }

  return () => {
    if (socket.current) {
      socket.current.off('receive_msg');
    }
  }
    Users.SetMessage("");
    console.log(Users.chatMessages);
    
    // eslint-disable-next-line
  },[Users.chatMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      const lastMessage = scrollRef.current.lastChild;
      if (lastMessage) {
        lastMessage.scrollIntoView({ behavior: "smooth" });
      }
    }
}, [Users.chatMessages])


  return (
    <>
    <Box className="ChatContainer" ref={scrollRef}>
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
