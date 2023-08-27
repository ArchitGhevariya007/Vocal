const mongoose = require('mongoose');

//Schema
const messasgeSchema = mongoose.Schema({
    conversationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Rooms",
        required: true,
    },
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required: true,
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required: true,
    },
    SenderContent: {
        type:String,
        lowercase:true,
        trim:true,
    },
    ReceiverContent: {
        type:String,
        lowercase:true,
        trim:true,
    },
},{
    timestamps:true
});

//Model
const Messages=mongoose.model('Messages',messasgeSchema);

module.exports = Messages;
