const express = require("express");
const routes = express.Router();

//---------------------------- Middlewares ----------------------------
const authenticateToken = require("../middlewares/Authorization");

//---------------------------- Controllers ----------------------------
const {AddUser,ListUsers}  = require("../controllers/AddUsers");


//---------------------------- Routes ----------------------------
routes.post("/AddUsers",authenticateToken, AddUser);
routes.get("/ListUsers",authenticateToken, ListUsers);


module.exports = routes;
