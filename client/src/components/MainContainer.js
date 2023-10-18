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

  // socket useRef Hook
  const socket = useRef();

  // validating user
  useEffect(() => {
    if (!Cookies.get("Token")) {
      navigate("/login");
    }
  }, [navigate]);

  const userInfo = UsersContext.selectedUserInfo;

  // if user is available then adding it to socket server
  useEffect(() => {
    if (
      UsersContext.currentUser &&
      UsersContext.selectedUserInfo &&
      !socket.current
    ) {
      socket.current = io("http://localhost:5001");
      socket.current.emit("add-user", UsersContext.currentUser);
    }
    // eslint-disable-next-line
  }, [UsersContext.selectedUserInfo]);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth <= 768) {
        UsersContext.setIsMobileScreen(true);
      } else {
        UsersContext.setIsMobileScreen(false);
      }
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {UsersContext.isMobileScreen?(
      <Users socket={socket} />
      ):(
      <>
        <Users socket={socket} />
        {userInfo !== null && userInfo !== undefined ? ( 
        // If user is not selected then displaying default page
        <>
          <ChatHeader socket={socket} />
          <MsgSender socket={socket} />
          <ChatContainer socket={socket} />
        </>
        ) : (
        <DefaultWindow />
        )}
      </>
      )}
    </>
  );
}
