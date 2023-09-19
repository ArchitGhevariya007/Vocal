import React, { useContext, useEffect } from "react";
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

export default function Users({ socket }) {
  //************* Using Context *************
  const Users = useContext(AppContext);
  const navigate = useNavigate();

  //Logout user
  const LogOutUser = () => {
    Cookies.remove("Token");
    navigate("/login");
  };

  //Searching User
  const FilterdUsers = Users.users?.filter((user) =>
    user.participant.name.toLowerCase().includes(Users.searchUser.toLowerCase())
  );

  // Selecting User
  const handleUserClick = (userId) => {
    Users.setSelectedUser(userId);
  };

  //Add user Modal
  const handleOpenModal = () => {
    Users.SetAddUserModalOpen(true);
  };

  const handleCloseModal = () => {
    Users.SetAddUserModalOpen(false);
  };

  // Fetching userdata after loading
  useEffect(() => {
    Users.fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    Users.setChatMessages([]);
    // eslint-disable-next-line
  }, [Users.selectedUser]);

  return (
    <>
      <Box className="Sidebar">
        <Box>
          <IconButton className="add-user-btn" onClick={handleOpenModal}>
            <Plus color="#296eff" />
          </IconButton>
        </Box>
      </Box>

      <AddUserModal
        open={Users.AddUserModalOpen}
        handleClose={handleCloseModal}
        socket={socket}
      />
      <Container className="UserContacts">
        {/* App header and search */}
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
          {FilterdUsers?.map((user) => (
            <div
              className={`profile_Container ${
                user.participant.id === Users.selectedUser
                  ? "selected-user"
                  : ""
              }`}
              key={user.participant.id}
              onClick={() => handleUserClick(user.participant.id)}
            >
              <Avatar src={`${user.participant.photo}`} alt="" />

              <div className="user-info ">
                <div className="username-time">
                  <p className="username">{user.participant.name}</p>
                  <p className="recent-time">{user.participant.last_message_time}</p>
                </div>
                <p className="last-message">{user.participant.last_message}</p>
              </div>
            </div>
          ))}
        </Box>

        {/* User component end*/}
      </Container>
    </>
  );
}
