import React, { useContext } from "react";
import {
  TextField,
  InputAdornment,
  Container,
  Box,
  Avatar,
} from "@mui/material";
import { Search, MessagesSquare, ArrowRightToLine } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast, Slide } from "react-toastify";
import Cookies from "js-cookie";
import { AppContext } from "../context/ContextAPI";

import "../style/style.css";
import "react-toastify/dist/ReactToastify.css";

export default function Users() {
  //************* Using Context *************
  const Users = useContext(AppContext);
  const navigate = useNavigate();

  //Logout user
  const LogOutUser = () => {
    Cookies.remove("Token");
    navigate("/login");
    // toast.success("Logout succesfully", {
    //   className: "toast_message",
    // });
  };

  //Searching User
  const FilterdUsers = Users.users.filter((user) =>
    user.name.toLowerCase().includes(Users.searchUser.toLowerCase())
  );

  const handleUserClick = (user) => {
    Users.setSelectedUser(user);
    console.log(Users.SelectedUser);
  };

  return (
    <>
      <Container className="UserContacts">
        <Box className="Heading_Search">
          {/* Title */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p className="Heading">Vocal</p>
            <ArrowRightToLine
              size="16"
              className="logout-icon"
              onClick={LogOutUser}
            />
          </Box>
          {/* Search box */}
          <TextField
            placeholder="Search..."
            className="SearchBox"
            size="small"
            autoComplete="off"
            onChange={(e) => {
              Users.setSearchUser(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size="16" />
                </InputAdornment>
              ),
              style: { color: "#ffffff" },
            }}
          />
        </Box>

        {/* User component start*/}
        <Box className="allmsglbl">
          <MessagesSquare size="14" color="#aaaaaa" />
          <p className="lbltext">All messages</p>
        </Box>

        {/* Displaying Users */}
        {FilterdUsers.map((user, key) => (
          <div
            className="profile_Container"
            key={key}
            onClick={() => handleUserClick(user)}
          >
            <Avatar src={user.profile} alt="" />
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

      {/*-------------- Toast Message --------------*/}
      {/* <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={true}
        theme="dark"
        transition={Slide}
      /> */}
    </>
  );
}
