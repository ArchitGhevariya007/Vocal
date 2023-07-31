const express=require('express');
const routes=express.Router();

const {register} = require('../controllers/UserAuthController');

routes.post("/register",register);

module.exports=routes;