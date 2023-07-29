import React from "react";
import { Box, Button, TextField,Stack } from "@mui/material";
import { Link } from "react-router-dom";

import "../style/style.css";

export default function Login() {
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
          />
          <TextField
            placeholder="Password"
            className="LoginFields"
            size="small"
            InputProps={{
              style: { color: "#ffffff" },
            }}
          />
          <Button className="LoginButton" size="small">Let me in </Button>
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
