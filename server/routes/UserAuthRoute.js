const express = require("express");
const routes = express.Router();

//---------------------------- Middlewares ----------------------------
const upload = require("../middlewares/FileUploadMidware");
const UserAuth = require("../middlewares/UserAuth");

//---------------------------- Controllers ----------------------------
const { register, login } = require("../controllers/UserAuthController");

//---------------------------- Routes ----------------------------
routes.get("/", UserAuth, (req, res) => {
    res.send(JSON.stringify("Hello"));
});


routes.post("/login", login);
routes.post("/register", upload.single("profile_photo"), register);



module.exports = routes;
