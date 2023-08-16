// const express = require('express')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users =require("../models/UsersModel");



//------------------------ Register user ------------------------
const register=async(req,res)=>{
    try{
        const {name,phone_no,password,email,visibility,access_token}=req.body;

        if(!name || !phone_no || !password || !email){
            return res.status(404).json({
                "message":"Please Provide all data!",
                "app_status":false
            })
        }

        if(!req.file){
            return res.status(400).json({
                "message":"Please provide profile photo!",
                "app_status":false
            })
        }

        // Check if image size is less than 1mb
        // if(req.file.size>1024 * 1024 * 5){
        //     return res.status(400).json({
        //         "message":"Profile photo should be less than 5mb!",
        //         "app_status":false
        //     })
            
        // }

        // Check if file is image
        // if(!(req.file.mimetype=== "image/jpeg" || req.file.mimetype=== "image/png")){
        //     return res.status(400).json({
        //         "message":"File must me jpeg or png",
        //         "app_status":false
        //     })
        // }

        // Check if phone_no is already registered
        const phoneAvailable=await Users.findOne({phone_no})
        if(phoneAvailable){
            return res.status(403).json({
                "message":"Mobile already exists!",
                "app_status":false
            })
        }

        // Check if email is already registered
        const emailAvailable=await Users.findOne({email})
        if(emailAvailable){
            return res.status(403).json({
                "message":"Email already exists!",
                "app_status":false
            })
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        

        // JWT token
        const accesstoken = jwt.sign(
        {
            phone_no
        },
            process.env.TOKEN_SECRET,
            { expiresIn: "365d" }
        );

        // Insert new User
        const newUser = await Users.create({
                name,
                phone_no,
                profile_photo:req.file.path,
                email,
                password:hashedPassword,
                visibility,
                access_token:accesstoken
        });

        if(newUser){
            const result={
                name:newUser.name,
                phone_no:newUser.phone_no,
                email:newUser.email,
                message:"User registered successfully!",
                "app_status":true
            }
            return res.status(200).json(result)
        }
        else{
            return res.status(400).json({
                "message": "Unable to register user!",
                "app_status":false
            })
        }

    }
    catch(err){
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
        
        if (!email && !phone_no) {
            return res.status(400).json({
                message: "Please provide credentials!",
                app_status: false,
            });
        }

        if(!password) {
            return res.status(404).json({
                "message":"Please provide password!",
                "app_status":false
            })
        }

        // Checking user Availability
        if(!user){
            return res.status(404).json({
                "message":"Invalid credentials!",
                "app_status":false
            })
        }   
        
        // Validating password
        const isValidPsd=await bcrypt.compare(password,user.password);
        if(!isValidPsd){
            return res.status(401).json({
                "message":"Invalid Password!",
                "app_status":false
            })
        }

        // JWT token
        const token = jwt.sign(
            {
                userId: user._id,
            },
            process.env.TOKEN_SECRET,
            { expiresIn: "365d" }
        );
        
        // res.cookie("token", token, { maxAge: 900000, httpOnly: true });

        return res.status(200).json({
            "message":"User logged in successfully!",
            "Token":token,
            "app_status":true
        })

    }
    catch(err){
        return res.status(500).json({
            message:err.message,
            "app_status":false
        })
    }
}

module.exports={register,login}


