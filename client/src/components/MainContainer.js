import React, { useEffect } from "react";
import Users from "./Users";
import ChatHeader from "./ChatHeader";
import { useNavigate } from "react-router-dom";
import MsgSender from "./MsgSender";
import ChatContainer from "./ChatContainer";
import Cookies from 'js-cookie';
// import ContextAPI from '../context/ContextAPI';

export default function MainContainer() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get('Token')) {
      navigate("/login");
    }
  }, [navigate]);

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
