const Users = require("../models/UsersModel");
const Room = require("../models/RoomModel");


const AddUser=async (req,res)=>{
    try{
        const {phone_no}=req.body;
        const {userId}=req.user;


        const mobileAvailable=await Users.findOne({ phone_no });
        if(!mobileAvailable){
            return res.status(404).json({
                message:"Mobile number is not available",
                app_status:false
            })
        }

        // const participants=[];
        // const newRoom = await Room.create({

        // });

        res.json(phone_no);
    }catch(err){
        return res.status(500).json({
            message:err.message,
            app_status:false
        })
    }

}

module.exports={AddUser};