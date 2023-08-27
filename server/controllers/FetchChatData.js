const Users = require("../models/UsersModel");
const Room = require("../models/RoomModel");
const Messages=require("../models/MessageModel");

const FetchChatData=async (req,res)=>{
    const {userId}=req.body;

    const user=await Users.findOne({ _id:userId });

    res.status(200).json({
        id:user._id,
        name:user.name,
        phone_no:user.phone_no,
        photo:user.profile_photo
    })
}

module.exports={FetchChatData}