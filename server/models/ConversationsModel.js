const mongoose = require('mongoose');

//Schema
const conversationsSchema=new mongoose.Schema({
    participants:{
        type:[mongoose.Schema.Types.ObjectId],
        default:[],
        ref:"Users"
    },
    timestamps:true
})

//Model
const Conversations=mongoose.model('Conversations',conversationsSchema);

module.exports = Conversations;