const mongoose = require('mongoose');

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
    content: {
        type:Mixed,
        lowercase:true,
        trim:true,
    },
    timestamps:true

});

//Model
const Message=mongoose.model('Message',messasgeSchema);

module.exports = Message;
