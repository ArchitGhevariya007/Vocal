import Users from "./components/Users";
import ChatHeader from "./components/ChatHeader";
import MsgSender from "./components/MsgSender";

import ChatContainer from "./components/ChatContainer";
import DefaultWindow from "./components/DefaultWindow";

import "./style/style.css";

function App() {
  return (
    <>
      <Users/>
      {/* <ChatHeader/>
      <MsgSender/>
      <ChatContainer/> */}
      <DefaultWindow/>
    </>
  );
}

export default App;
