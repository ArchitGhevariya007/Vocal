const Users = require("../models/UsersModel");
const Room = require("../models/RoomModel");
const Messages = require("../models/MessageModel");
const mongoose = require('mongoose');


const FetchSelectedUser = async (req, res) => {
    try {
        const { selectedUser } = req.body;

        const userId=req.user.userId;

        //Finding in  how many rooms our user is enrolled
        const room = await Room.findOne({
            participants: { $all: [userId, selectedUser] }
        });

        if (!room) {
            return res.status(404).json({
                message: 'Room not found for the selected users',
                app_status: false
            });
        }

        // Find the other participant's user details
        const otherParticipantId = room.participants.find(participantId => participantId.toString() !== userId.toString());

        if (!otherParticipantId) {
            return res.status(404).json({
                message: 'Other participant not found in the room',
                app_status: false
            });
        }

        const user = await Users.findById(otherParticipantId);

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                app_status: false
            });
        }

        res.status(200).json({
            id: user._id,
            senderId:userId,
            name: user.name,
            phone_no: user.phone_no,
            photo: user.profile_photo,
        });

    } 
    catch (err) {
        return res.status(500).json({
        message: err.message,
        app_status: false,
        });
    }
};

const FetchChatData = async (req, res) => {
    try {
        const { participantId } = mongoose.Types.ObjectId(req.body);
        const userId = mongoose.Types.ObjectId(req.user.userId);

        // const msg=await Messages.find({'$or':[{ sender:userId },{receiver:userId}]});
        const msg = await Messages.find({
        $or: [
            { sender: userId, receiver: participantId },
            { sender: participantId, receiver: userId },
        ],
        });
        // console.log(msg);
        
        const msgList = msg.map((message) => ({
        sender: message.sender,
        msg: message.content,
        msgTime: message.createdAt,
        }));

        // const newMsg = await Messages.create({
        //     roomId: "64ea4aad5cbd115e2b7aadb9",
        //     sender: userId,
        //     receiver: participantId,
        //     content:"Hello"
        // });

        res.status(200).json({
        messages: msgList,
        });
    } catch (err) {
        return res.status(500).json({
        message: err.message,
        app_status: false,
        });
    }
};

module.exports = { FetchChatData, FetchSelectedUser };
