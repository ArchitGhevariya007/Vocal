import React, { useEffect } from "react";
import Users from "./Users";
import ChatHeader from "./ChatHeader";
import { useNavigate } from "react-router-dom";
import MsgSender from "./MsgSender";
import ChatContainer from "./ChatContainer";
// import ContextAPI from '../context/ContextAPI';

export default function MainContainer() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     navigate("/login");
  //   }
  // }, []);

  return (
    <>
      {/* <ContextAPI> */}
      <Users />
      <ChatHeader />
      <MsgSender />
      <ChatContainer />
      {/* </ContextAPI> */}
    </>
  );
}
