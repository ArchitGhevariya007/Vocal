const express = require("express");
const routes = express.Router();

//---------------------------- Middlewares ----------------------------
const authenticateToken = require("../middlewares/Authorization");

//---------------------------- Controllers ----------------------------
const {AddUser}  = require("../controllers/AddUsers");


//---------------------------- Routes ----------------------------
routes.post("/AddUsers",authenticateToken, AddUser);

module.exports = routes;
