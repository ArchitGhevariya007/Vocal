import React, { useContext, useEffect } from "react";
import Users from "./Users";
import ChatHeader from "./ChatHeader";
import { useNavigate } from "react-router-dom";
import MsgSender from "./MsgSender";
import ChatContainer from "./ChatContainer";
import Cookies from "js-cookie";
import { AppContext } from "../context/ContextAPI";
import DefaultWindow from "./DefaultWindow";

export default function MainContainer() {
  
  //************* Using Context *************
  const UsersContext = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get("Token")) {
      navigate("/login");
    }
  }, [navigate]);
  console.log("Hello"+UsersContext.selectedUserInfo)

  const userInfo = UsersContext.selectedUserInfo.userInfo;

  return (
    <>
      <Users />
      {userInfo ? (
        <>
          <ChatHeader />
          <MsgSender />
          <ChatContainer />
        </>
      ) : (
        <DefaultWindow />
      )}
    </>
  );
}
