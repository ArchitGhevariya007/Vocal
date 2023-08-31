const Users = require("../models/UsersModel");
const Room = require("../models/RoomModel");
const Messages = require("../models/MessageModel");
const mongoose = require('mongoose');


const FetchSelectedUser = async (req, res) => {
    try {
        const { participantId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(participantId)) {
            return res.status(400).json({
                message: 'Invalid participantId',
                app_status: false
            });
        }

        const user = await Users.findOne({ _id: participantId });

        res.status(200).json({
        userInfo: {
            id: user._id,
            name: user.name,
            phone_no: user.phone_no,
            photo: user.profile_photo,
        },
        });
    } catch (err) {
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
