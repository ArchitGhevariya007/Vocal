// const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users =require("../models/UsersModel");

//------------------------ Register user ------------------------
const register=async(req,res)=>{
    try{

        const {name,phone_no,profile_photo,password,email,visibility}=req.body;

        //Check if the data is empty
        // if(!name || !phone_no ||!profile_photo||!password || !email|| !visibility ){
        //     return res.status(404).json({
        //         "message":"Please fill all required fields!",
        //         "app_status":false
        //     })
        // }

        // check if phone_no is already registered
        const phoneAvailable=await Users.findOne({phone_no})
        console.log(phoneAvailable)
        if(phoneAvailable){
            return res.status(403).json({
                "message":"Mobile already exists!",
                "app_status":false
            })
        }

        // check if email is already registered
        const emailAvailable=await Users.findOne({email})
        if(emailAvailable){
            return res.status(403).json({
                "message":"Email already exists!",
                "app_status":false
            })
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        //JWT token
        const token=jwt.sign(
            {
                name,
                phone_no,
                email,
                hashedPassword,
                visibility
            },
            process.env.TOKEN_SECRET,
            {expiresIn:"365d"})
        
        const newUser = await Users.create({
                name,
                phone_no,
                profile_photo,
                email,
                password:hashedPassword,
                visibility,
                access_token:token
        });

        if(newUser){
            res.setHeader("Authorization",token)
            const result={
                name:newUser.name,
                phone_no:newUser.phone_no,
                email:newUser.email,
                message:"User registered successfully!",
                "app_status":true
            }
            return res.status(200).json(result)
        }else{
            return res.status(400).json({
                "message": "Unable to register user!",
                "app_status":false
            })
        }

    }catch(err){
        return res.status(500).json({
            "message":err.message,
            "app_status":false
        })
    }
}

//------------------------ Login user ------------------------

const login=async (req,res)=>{
    try{
        const {email,phone_no,password}=req.body;
        const user=await Users.findOne({ $or: [{ email }, { phone_no }]});
        
        if(!user){
            return res.status(404).json({
                "message":"User Not Found!",
                "app_status":false
            })
        }   
        

        const isValidPsd=await bcrypt.compare(password,user.password);
        if(!isValidPsd){
            return res.status(401).json({
                "message":"Invalid Password!",
                "app_status":false
            })
        }

        const token = jwt.sign(
            {
                name: user.name,
                phone_no: user.phone_no,
                email: user.email,
                visibility: user.visibility
            },
            process.env.TOKEN_SECRET,
            { expiresIn: "365d" }
        );

        return res.status(200).json({
            "message":"User logged in successfully!",
            "Token":token,
            "app_status":true
        })

    }catch(err){
        return res.status(500).json({
            message:err.message,
            "app_status":false
        })
    }
}

module.exports={register,login}


