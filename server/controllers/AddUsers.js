const Users = require("../models/UsersModel");
const Room = require("../models/RoomModel");

// Adding Users for Chat
const AddUser=async (req,res)=>{
    try{
        const {phone_no}=req.body;
        const userId=req.user.userId;

        // Getting logged in user's phone no using JWT 
        const user=await Users.findOne({ _id:userId });
        const phone_no_sender=user._id;

        // Check if phone_no is already registered
        const mobileAvailable=await Users.findOne({phone_no});
        if(!mobileAvailable){
            return res.status(404).json({
                message:"Mobile number is not available",
                app_status:false
            })
        }

        const phone_no_receiver=mobileAvailable._id;

        // Check if Numbers are same
        if(phone_no_sender.equals(phone_no_receiver)){
            return res.status(400).json({
                message:"Can't add own Phone number",
                app_status:false
            })
        }

        // Check if Room is already registered
        const userAvailable=await Room.findOne({participants:[phone_no_sender,phone_no_receiver]});
        if(userAvailable){
            return res.status(404).json({
                message:"User already added!",
                app_status:false
            })
        }

        // Creating new Room
        const newRoom = await Room.create({participants:[phone_no_sender,phone_no_receiver]});

        if (newRoom) {
                return res.status(200).json({
                    message:"User added successfully!",
                    app_status:true
                });
            } 
            else {
                return res.status(400).json({
                    message: "Unable to add user!",
                    app_status: false,
                });
            }
    }
    catch(err){
        return res.status(500).json({
            message:err.message,
            app_status:false
        })
    }
}

// Fetching Users in List
const ListUsers=async (req,res)=>{
    try{
        const userId=req.user.userId;

        //Finding in  how many rooms our user is enrolled
        const userRooms =await Room.find({participants:{$in:[userId]}})

        const participantsList = [];

        // Fetching Room id / participant id,name and profile photo
        await Promise.all(userRooms.map(async room => {
            const otherParticipant = room.participants.find(participantId => participantId != userId).toString();

            if(otherParticipant){
                const participant=await Users.findOne({_id:otherParticipant})
                participantsList.push({
                    room_id: room._id,
                    participant:{
                        id:otherParticipant,
                        name:participant.name,
                        photo:participant.profile_photo
                    } 
                });
            }
        }));

        return res.status(200).json({ participantsList });
    }
    catch(err){
        return res.status(500).json({
            message:err.message,
            app_status:false
        })
    }

}

module.exports={AddUser,ListUsers};