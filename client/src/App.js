import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import Login from "./components/Login";
import Register from "./components/Register";
// import DefaultWindow from "./components/DefaultWindow";
import "./style/style.css";
import ContextAPI from "./context/ContextAPI";

function App() {
  return (
    <>
      {/* <DefaultWindow/> */}
      <ContextAPI>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainContainer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </ContextAPI>
    </>
  );
}

export default App;
