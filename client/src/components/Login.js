import { Box, Button, TextField } from "@mui/material";
import React from "react";
import "../style/style.css";

export default function Login() {
  return (
    <>
      <Box className="Login">
        <Box className="LoginContainer">
          <p>Login</p>
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
          <Button>Login</Button>
        </Box>
      </Box>
    </>
  );
}
