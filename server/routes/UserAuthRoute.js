const express=require('express');
const routes=express.Router();

//---------------------------- Middlewares ----------------------------
const upload = require('../middlewares/FileUploadMidware');


//---------------------------- Controllers ----------------------------
const {register,login} = require('../controllers/UserAuthController');


//---------------------------- Routes ----------------------------
routes.post("/register",upload.single('profile_photo'),register);
routes.post("/login",login);


module.exports=routes;