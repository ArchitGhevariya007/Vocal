import Users from "./components/Users";
import ChatHeader from "./components/ChatHeader";
import MsgSender from "./components/MsgSender";

import "./style/style.css";
import ChatContainer from "./components/ChatContainer";


function App() {
  return (
    <>
      <Users/>
      <ChatHeader/>
      <MsgSender/>
      <ChatContainer/>
    </>
  );
}

export default App;
