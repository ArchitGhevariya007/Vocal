import React from "react";
import { TextField, InputAdornment, Container } from "@mui/material";
import { Search } from "lucide-react";
import "../style/style.css";

export default function Users() {
  return (
    <>
      <Container className="UserList">
        <p className="Heading">Messages</p>
        <TextField
          placeholder="Search..."
          className="SearchBox"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size="16" />
              </InputAdornment>
            ),
          }}
        />

        <div className="UserDetails">
          <img
            className="profile-image"
            src={require("../assets/imgs/profile.jpg")}
            alt=""
          />
          <div className="user-info">
            <p className="username">Archit Ghevariya</p>
            <p className="last-message">Hello..!</p>
          </div>
        </div>
      </Container>
    </>
  );
}
