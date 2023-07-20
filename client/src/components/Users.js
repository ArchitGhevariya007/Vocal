import React from "react";
import { TextField, InputAdornment, Container, Box } from "@mui/material";
import { Search, MessagesSquare } from "lucide-react";
import "../style/style.css";

export default function Users() {
  // Temp data
  const data = [
    {
      profile: require("../assets/imgs/profile.jpg"),
      name: "Archit Ghevariya",
      lastmsg: "Hello..!",
      recenttime: "10:25 PM",
    },
    {
      profile: require("../assets/imgs/profile.jpg"),
      name: "Shubham Khunt",
      lastmsg: "How are you?",
      recenttime: "12:35 PM",
    },
    {
      profile: require("../assets/imgs/profile.jpg"),
      name: "Harshil Ramani",
      lastmsg: "Hyy there..!",
      recenttime: "11:21 PM",
    },
  ];

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
        {data.map((user) => (
          <div className="profile_Container">
            <img className="profile-image" src={user.profile} alt="" />
            <div className="user-info">
              <div className="username-time">
                <p className="username">{user.name}</p>
                <p className="recent-time">{user.recenttime}</p>
              </div>
              <p className="last-message">{user.lastmsg}</p>
            </div>
          </div>
        ))}

        {/* User component end*/}
      </Container>
    </>
  );
}
