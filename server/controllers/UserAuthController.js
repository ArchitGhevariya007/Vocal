// const Users =require("../models/UsersModel");

const mongoose = require("mongoose");

const register=async(req,res)=>{
    try{
        const response=req.body;
        res.send(response);
    }catch(e){
        console.log(e);
        res.status(500)
    }
}

module.exports={register}