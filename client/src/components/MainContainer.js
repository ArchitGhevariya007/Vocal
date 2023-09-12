import React, {useContext, useEffect,useRef } from "react";
import Users from "./Users";
import ChatHeader from "./ChatHeader";
import { useNavigate } from "react-router-dom";
import MsgSender from "./MsgSender";
import ChatContainer from "./ChatContainer";
import Cookies from "js-cookie";
import { AppContext } from "../context/ContextAPI";
import DefaultWindow from "./DefaultWindow";
import { io } from 'socket.io-client'


export default function MainContainer() {
  
  //************* Using Context *************
  const UsersContext = useContext(AppContext);

  const navigate = useNavigate();
  const socket = useRef();

  useEffect(() => {
    if (!Cookies.get("Token")) {
      navigate("/login");
    }
  }, [navigate]);

  const userInfo = UsersContext.selectedUserInfo;

  useEffect(() => {
    if (UsersContext.currentUser) {
        socket.current = io("http://localhost:5001");
        socket.current.emit("add-user", UsersContext.selectedUserInfo?.id);
    }
    console.log(UsersContext.selectedUserInfo?.id)
    // eslint-disable-next-line
}, [UsersContext.selectedUserInfo])

  return (
    <>
      <Users />
      {userInfo !== null && userInfo !== undefined  ? (
        <>
          <ChatHeader/>
          <MsgSender socket={socket} />
          <ChatContainer socket={socket}/>
        </>
      ) : (
        <DefaultWindow />
      )}
    </>
  );
}
