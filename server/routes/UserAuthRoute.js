const express = require("express");
const routes = express.Router();

//---------------------------- Middlewares ----------------------------
const {upload,errorHandler} = require("../middlewares/FileUploadMidware");

routes.use(errorHandler);
//---------------------------- Controllers ----------------------------
const { register, login } = require("../controllers/UserAuthController");

//---------------------------- Routes ----------------------------
routes.post("/login", login);
routes.post("/register", upload.single("profile_photo"), register);



module.exports = routes;
