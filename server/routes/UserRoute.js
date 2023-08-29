const express = require("express");
const routes = express.Router();

//---------------------------- Middlewares ----------------------------
const authenticateToken = require("../middlewares/Authorization");

//---------------------------- Controllers ----------------------------
const {AddUser,ListUsers}  = require("../controllers/AddUsers");
const {FetchChatData,FetchSelectedUser}  = require("../controllers/FetchChatData");


//---------------------------- Routes ----------------------------
routes.post("/AddUsers",authenticateToken, AddUser);
routes.get("/ListUsers",authenticateToken, ListUsers);
routes.post("/fetchchatdata",authenticateToken, FetchChatData);
routes.post("/fetchselecteduser",authenticateToken, FetchSelectedUser);




module.exports = routes;
