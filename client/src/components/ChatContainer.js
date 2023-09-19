import React, { useContext, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { AppContext } from "../context/ContextAPI";

import "../style/style.css";

export default function ChatContainer({ socket }) {
  //************* Using Context *************
  const Users = useContext(AppContext);

  const scrollRef = useRef();
  const currTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });


  // Receiving messages from server
  useEffect(() => {
    let currentSocket = socket.current;

    if (socket.current) {
      socket.current.on("receive_msg", (data) => {
        const { message } = data;
        if (data.from === Users.selectedUser) {
          Users.addMessage({ sender: false, text: message,time:currTime });
        }
      });
    }

    Users.SetMessage("");

    return () => {
      if (currentSocket) {
        currentSocket.off("receive_msg");
      }
    };

    // eslint-disable-next-line
  }, [Users.chatMessages]);


  // Scrolling to the last message
  useEffect(() => {
    if (scrollRef.current) {
      const lastMessage = scrollRef.current.lastChild;
      if (lastMessage) {
        lastMessage.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [Users.chatMessages]);

  return (
    <>
      <Box className="ChatContainer" ref={scrollRef}>
        {Users.chatMessages.map((message, index) => (
          <Box className={"MessageGroup"} key={index}>
            <Box className={`${message.sender ? "SenderMsg" : "ReceiverMsg"}`}>
              <p>{message.text}</p>
            </Box>
            <Box
              className={`${message.sender ? "msgSentTime" : "msgReceiveTime"}`}
            >
              <p>{message.time}</p>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
}
