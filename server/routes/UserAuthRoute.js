const express=require('express');
const routes=express.Router();

//---------------------------- Middlewares ----------------------------
const upload = require('../middlewares/FileUploadMidware');
const UserAuth = require('../middlewares/UserAuth');



//---------------------------- Controllers ----------------------------
const {register,login} = require('../controllers/UserAuthController');


//---------------------------- Routes ----------------------------
routes.post("/register",upload.single('profile_photo'),register);
routes.post("/login",UserAuth,login);


module.exports=routes;