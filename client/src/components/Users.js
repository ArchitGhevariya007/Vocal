import React,{useContext} from "react";
import { TextField, InputAdornment, Container, Box,Avatar } from "@mui/material";
import { Search, MessagesSquare } from "lucide-react";
import {AppContext} from "../context/ContextAPI"
import "../style/style.css";

export default function Users() {

   //************* Using Context *************
   const Users = useContext(AppContext);

  return (
    <>
      <Container className="UserContacts">
        
        <Box className="Heading_Search">
          {/* Title */}
          <p className="Heading">Vocal</p>
          {/* Search box */}
          <TextField
            placeholder="Search..."
            className="SearchBox"
            size="small"
            InputProps={
              {              
              startAdornment: (
                <InputAdornment position="start">
                  <Search size="16" />
                </InputAdornment>
              ),
              style:{color: "#ffffff"}
            }}
          />
        </Box>

        {/* User component start*/}
        <Box className="allmsglbl">
          <MessagesSquare size="14" color="#aaaaaa"/>
          <p className="lbltext">All messages</p>
        </Box>
        {Users.users.map((user,key) => (
          <div className="profile_Container" key={key}>
            <Avatar  src={user.profile} alt="" />
            <div className="user-info">
              <div className="username-time">
                <p className="username">{user.name}</p>
                <p className="recent-time">{user.recenttime}</p>
              </div>
              <p className="last-message">{user.lastmsg}</p>
            </div>
          </div>
        ))}
       {/* { console.log(Users.users)} */}

        {/* User component end*/}
      </Container>
    </>
  );
}
