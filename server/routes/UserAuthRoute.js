const express=require('express');
const routes=express.Router();

const upload = require('../middlewares/FileUploadMidware');

const {register,login} = require('../controllers/UserAuthController');

routes.post("/register",upload.single('profile_photo'),register);
routes.post("/login",login);


module.exports=routes;