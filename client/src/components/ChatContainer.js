import React from 'react'
import { Box  } from "@mui/material";
// import { Send } from "lucide-react";

import "../style/style.css";

export default function ChatContainer() {
  return (
    <>
      <Box className="ChatContainer">
        <Box>
          <Box className="SenderMsg"><p>Hello, how are you?</p></Box>
          <Box><p className='msgSentTime'>1.25 PM</p></Box>
        </Box>

        <Box>
          <Box className="ReceiverMsg"><p>I am Fine!</p></Box>
          <Box><p className='msgReceiveTime'>1.25 PM</p></Box>
        </Box>
      </Box>
    </>
  )
}
