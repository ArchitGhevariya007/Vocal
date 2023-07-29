
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import MainContainer from "./components/MainContainer";
import Login from "./components/Login";
import Register from './components/Register';
// import DefaultWindow from "./components/DefaultWindow";
import "./style/style.css";

function App() {
  return (
    <>     
      {/* <DefaultWindow/> */}
      <BrowserRouter>
      <Routes>
        <Route  path="/" element={<MainContainer/>} />
        <Route  path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
