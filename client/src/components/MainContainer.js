import React, { useContext, useEffect, useRef } from "react";
import Users from "./Users";
import ChatHeader from "./ChatHeader";
import { useNavigate } from "react-router-dom";
import MsgSender from "./MsgSender";
import ChatContainer from "./ChatContainer";
import Cookies from "js-cookie";
import { AppContext } from "../context/ContextAPI";
import DefaultWindow from "./DefaultWindow";
import { io } from "socket.io-client";

export default function MainContainer() {
  //************* Using Context *************
  const UsersContext = useContext(AppContext);
  const navigate = useNavigate();

  // Socket useRef Hook
  const socket = useRef();
  
  // Validating user
  useEffect(() => {
    if (!Cookies.get("Token")) {
      navigate("/login");
    }
  }, [navigate]);

  const userInfo = UsersContext.selectedUserInfo;

  //If user is available then adding it to socket server
  useEffect(() => {
    if (UsersContext.currentUser && UsersContext.selectedUserInfo) {

      socket.current = io("http://localhost:5001",{
        reconnection: true,
      });

      socket.current.emit("add-user", UsersContext.currentUser);
    }
    
    return () => {
      if (socket.current) {
          socket.current.disconnect();
      }
  };
    // console.log(UsersContext.currentUser);
    // eslint-disable-next-line
  }, [UsersContext.selectedUserInfo]);


  return (
    <>
      <Users socket={socket}/>
      {/* If user is not selected then displaying default page */}
      {userInfo !== null && userInfo !== undefined ? (
        <>
          <ChatHeader />
          <MsgSender socket={socket} />
          <ChatContainer socket={socket} />
        </>
      ) : (
        <DefaultWindow />
      )}
    </>
  );
}
