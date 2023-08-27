const express = require("express");
const routes = express.Router();

//---------------------------- Middlewares ----------------------------
const authenticateToken = require("../middlewares/Authorization");

//---------------------------- Controllers ----------------------------
const {AddUser,ListUsers}  = require("../controllers/AddUsers");
const {FetchChatData}  = require("../controllers/FetchChatData");


//---------------------------- Routes ----------------------------
routes.post("/AddUsers",authenticateToken, AddUser);
routes.get("/ListUsers",authenticateToken, ListUsers);
routes.post("/fetchchatdata",authenticateToken, FetchChatData);



module.exports = routes;
