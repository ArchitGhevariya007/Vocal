import React from "react";
import { TextField, InputAdornment, Container } from "@mui/material";
import { Search } from "lucide-react";
import "../style/style.css";

export default function Users() {
  return (
    <>
      <Container className="UserList">
        {/* Title */}
        <p className="Heading">Messages</p>
        {/* Search box */}
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

        {/* User component start*/}
        <div className="UserDetails">
          <img
            className="profile-image"
            src={require("../assets/imgs/profile.jpg")}
            alt=""
          />
          <div className="user-info">
            <div className="username-time">
              <p className="username">Archit Ghevariya</p>
              <p className="recent-time">10.02 PM</p>
            </div>
            <p className="last-message">Hello..!</p>
          </div>
        </div>

        {/* User component end*/}

      </Container>
    </>
  );
}
