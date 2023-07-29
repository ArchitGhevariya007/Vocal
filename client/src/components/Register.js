import React from 'react'
import { Box, Button, TextField,Stack } from "@mui/material";
import { Link } from "react-router-dom";

import "../style/style.css";

export default function Register() {
  return (
    <>
        <Box className="Login">
        <Stack className="LoginContainer">
          <p className="LoginTitle">Register</p>
          <TextField
            placeholder="Name"
            className="LoginFields"
            size="small"
            InputProps={{
              style: { color: "#ffffff" },
            }}
          />
          
          <TextField
            placeholder="Phone no"
            className="LoginFields"
            size="small"
            InputProps={{
              style: { color: "#ffffff" },
            }}
          />
          <Button className="ProfilePic" component="label">
            Profile photo
            <input hidden accept="image/*" multiple type="file" />
          </Button>
          <TextField
            placeholder="Email"
            className="LoginFields"
            size="small"
            InputProps={{
              style: { color: "#ffffff" },
            }}
          />
          
          <TextField
            placeholder="Password"
            className="LoginFields"
            size="small"
            InputProps={{
              style: { color: "#ffffff" },
            }}
          />
          <Button className="LoginButton" size="small">Sign up </Button>
          <Link to="/login" className="link">
            Already have account?
          </Link>
        </Stack>
      </Box>
    </>
  )
}
