import React,{useContext} from 'react'
import { Box, Button, TextField,Stack } from "@mui/material";
import { Link,useNavigate } from "react-router-dom";
import {AppContext} from '../context/ContextAPI';
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../style/style.css";

export default function Register() {

  //Using context
const Users=useContext(AppContext);

const navigate = useNavigate();


const handleInput=(event)=>{
  const {name,value}=event.target;
  Users.setRegisterData({...Users.registerData,[name]: value});
}

const handleImage = (event) => {
  Users.setRegisterData({...Users.registerData,"profile_photo": event.target.files[0]});
};


const handleRegister=async ()=>{
  try{
    const response=await fetch("http://localhost:5001/register",{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Users.registerData),
    });

    const data = await response.json();

    if (response.ok) {
      // localStorage.setItem("token", data.Token);
      navigate("/");
      Users.setRegisterData({})
    } 
    else {
      toast.error(data.message, {
        className: "toast_message",
      });
    }

    
  }catch(err){
    toast.error(err.message, {
      className: "toast_message",
    });
  }
}

console.log(Users.registerData);
  return (
    <>
        <Box className="Login">
        <Stack className="LoginContainer">
          <p className="LoginTitle">Register</p>
          <TextField
            name="name"
            placeholder="Name"
            className="LoginFields"
            size="small"
            InputProps={{
              style: { color: "#dfdfdf",fontSize: "16px" },
            }}
            onChange={handleInput}
          />
          
          <TextField
          name="phone_no"
            placeholder="Phone no"
            className="LoginFields"
            size="small"
            InputProps={{
              style: { color: "#dfdfdf",fontSize: "16px" },
            }}
            onChange={handleInput}
          />

          <Button className="ProfilePic" component="label">
            Profile photo
            <input name="profile_photo" hidden accept="image/*" multiple type="file" onChange={handleImage}/>
          </Button>

          <TextField
          name="email"
            placeholder="Email"
            className="LoginFields"
            size="small"
            InputProps={{
              style: { color: "#dfdfdf",fontSize: "16px" },
            }}
            onChange={handleInput}
          />
          
          <TextField
          name='password'
          type="password"
            placeholder="Password"
            className="LoginFields"
            size="small"
            InputProps={{
              style: { color: "#dfdfdf",fontSize: "16px" },
            }}
            onChange={handleInput}
          />
          <Button className="LoginButton" size="small" onClick={handleRegister}>Sign up </Button>
          <Link to="/login" className="link">
            Already have account?
          </Link>
        </Stack>
      </Box>

      {/*-------------- Toast Message --------------*/}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={true}
        theme="dark"
        transition={Slide}
      />
    </>
  )
}
  