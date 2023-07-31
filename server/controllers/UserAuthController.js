const mongoose = require("mongoose");
const Users =require("../models/UsersModel");

const register=async(req,res)=>{
    try{
        const {name,phone_no,profile_photo,email,visibility}=req.body;

        //Check if the data is empty
        if(!name || !phone_no ||!profile_photo|| !email|| !visibility ){
            res.status(404).json({
                "message":"Please fill all required fields!",
                "app_status":false
            })
        }

        // check if phone_no is already registered
        const phoneAvailable=await Users.findOne({phone_no})

        if(phoneAvailable){
            res.status(403).json({
                "message":"Mobile already exists!",
                "app_status":false
            })
        }

         // check if email is already registered
        const emailAvailable=await Users.findOne({email})

        if(emailAvailable){
            res.status(403).json({
                "message":"Mobile already exists!",
                "app_status":false
            })
        }
        

        res.status(200).json({
            name,
            phone_no
        })
    }catch(e){
        res.status(500).json({
            "message":e,
            "app_status":false
        })
    }
}

module.exports={register}


//        **** Sign up a user ****
// 1. check if all fields are empty or not ✅
// 2. check mobile, email is exits or not  ✅
// 3. assign jwt token
// 4. insert new user in DB
// 5. send a response whether the user added or not

