import React,{useContext} from "react";
import { Box, Button, TextField,Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { AppContext } from "../context/ContextAPI";


import "../style/style.css";

export default function Login() {
  //************* Using Context *************
  const Users = useContext(AppContext);

  const handleInputChange =(event)=>{
    const {name,value} = event.target;
    Users.setLoginData({...Users.loginData,[name]:value})
  }

  const handleLogin=async ()=>{
    try{
      const response=await fetch('http://localhost:5001/login',{
        method:"POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify()
      })

      const data=await response.json();

      if(response.ok){
          localStorage.setItem("token", data.token);
          window.location.href = "/";
      }else{
        console.error("Login failed:", data.message);
      }
    }
    catch(err){
      alert(err.message)
    }
  }
  return (
    <>
      <Box className="Login">
        <Stack className="LoginContainer">
          <p className="LoginTitle">Login</p>
          <TextField
            placeholder="Phone no / Email"
            className="LoginFields"
            size="small"
            InputProps={{
              style: { color: "#ffffff" },
            }}
            onChange={handleInputChange}
          />
          <TextField
            placeholder="Password"
            type="password"
            className="LoginFields"
            size="small"
            InputProps={{
              style: { color: "#ffffff" },
            }}
            onChange={handleInputChange}
          />
          <Button className="LoginButton" size="small" onClick={handleLogin}>Let me in </Button>
          <Link 
          to="/register"
           className="link">
            Don't have any account?
          </Link>
        </Stack>
      </Box>
    </>
  );
}
