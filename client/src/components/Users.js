import React, { useContext } from "react";
import {
  TextField,
  InputAdornment,
  Container,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";
import { Search, MessagesSquare, ArrowRightToLine, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AppContext } from "../context/ContextAPI";
import AddUserModal from "./AddUserModal";

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
  };

  //Searching User
  const FilterdUsers = Users.users.filter((user) =>
    user.name.toLowerCase().includes(Users.searchUser.toLowerCase())
  );

  const handleUserClick = (user) => {
    Users.setSelectedUser(user);
    console.log(Users.SelectedUser);
  };

  //Add user Modal
  const handleOpenModal = () => {
    Users.AddUserModalOpen(true);
  };

  const handleCloseModal = () => {
    Users.AddUserModalOpen(false);
  };

  return (
    <>
      <Box className="Sidebar" >
        <Box >
          <IconButton className="add-user-btn" onClick={handleOpenModal}>
            <Plus color="#296eff" />
          </IconButton>
        </Box>
      </Box>
      <AddUserModal open={Users.AddUserModalOpen} onClose={handleCloseModal}/>
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

        <Box className="UserList">
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
        </Box>

        {/* User component end*/}
      </Container>
    </>
  );
}
