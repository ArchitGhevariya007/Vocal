import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import Login from "./components/Login";
import Register from "./components/Register";
import ContextAPI, { AppContext } from "./context/ContextAPI";
// import { ProtectedRoute } from "./routes/ProtectedRoute";
// import DefaultWindow from "./components/DefaultWindow";
import "./style/style.css";

function App() {

  //-------------- Using Context --------------
  const isAuthUser = useContext(AppContext);

  return (
    <>
      {/* <DefaultWindow/> */}
      <ContextAPI>
        <BrowserRouter>
          <Routes>
            {/* <Route
              path="/"
              exact
              element={
                isAuthUser ? <MainContainer /> : <Navigate to="/login" />
              }
            /> */}
            {/* <ProtectedRoute path="/" exact component={<MainContainer />} /> */}
            <Route path="/" element={<MainContainer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </ContextAPI>
    </>
  );
}

export default App;
