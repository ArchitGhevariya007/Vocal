const Users = require("../models/UsersModel");
const Room = require("../models/RoomModel");
const Messages = require("../models/MessageModel");

const FetchChatData = async (req, res) => {
    const { participantId } = req.body;
    const userId = req.user.userId;

    const user = await Users.findOne({ _id: participantId });
    const msg=await Messages.find({'$or':[{ sender:userId },{receiver:userId}]});
    const msgList = msg.map((message) => message.content);

    // const newMsg = await Messages.create({
    //     roomId: "64ea4a9f5cbd115e2b7aadb2",
    //     sender: userId,
    //     receiver: participantId,
    //     content:"Hello"
    // });
    console.log(user);

    res.status(200).json({
        userInfo: {
        id: user._id,
        name: user.name,
        phone_no: user.phone_no,
        photo: user.profile_photo,
        },
        msgs:{
            content:msgList
        }
        
        
    });
};

module.exports = { FetchChatData };
