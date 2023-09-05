import React,{useContext} from 'react'
import { Box  } from "@mui/material";
import { AppContext } from "../context/ContextAPI";

import "../style/style.css";

export default function ChatContainer() {

  //************* Using Context *************
  const Users = useContext(AppContext);
  return (
    <>
    <Box className="ChatContainer">
      {Users.chatMessages.map((message, index) => (
        <Box className={"MessageGroup"} key={index}>
        <Box className={`${message.sender  ? 'SenderMsg' : 'ReceiverMsg'}`}>
        {message.sender && <p>Sender:</p>}
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
