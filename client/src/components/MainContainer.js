import React from 'react'
import Users from "./Users";
import ChatHeader from "./ChatHeader";
import MsgSender from "./MsgSender";
import ChatContainer from "./ChatContainer";
// import ContextAPI from '../context/ContextAPI';


export default function MainContainer() {
  return (
    <>
    {/* <ContextAPI> */}
      <Users/>
      <ChatHeader/>
      <MsgSender/>
      <ChatContainer/>
    {/* </ContextAPI> */}
    </>
  )
}
