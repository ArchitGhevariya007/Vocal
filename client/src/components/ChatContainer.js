import React,{useContext,useEffect} from 'react'
import { Box  } from "@mui/material";
import { AppContext } from "../context/ContextAPI";

import "../style/style.css";

export default function ChatContainer({socket}) {

  //************* Using Context *************
  const Users = useContext(AppContext);

  useEffect(() => {
    console.log(socket.current)
    if(socket.current){
      socket.current.on("receive_msg", (data) => {
        console.log('Received message:', data);
        const {message } = data;
        Users.addMessage({sender:false, text: message}); 
      });
    }
    Users.SetMessage("");
    console.log(Users.chatMessages);
    
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
