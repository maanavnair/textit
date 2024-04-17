const Message = require('../model/messageModel');
const Conversation = require('../model/conversationModel');
const { getReceiverSocketId, io } = require('../socket/socket')
const mongoose = require('mongoose');

module.exports.sendMessage = async(req, res) => {
    try{
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        //await conversation.save();
        //await newMessage.save();

        //this will run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage); //sending events to specific clients
        }

        res.status(201).json(newMessage);

    }
    catch(err){
        console.log("Error in sendMessage controller: ", err.message);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

module.exports.getMessages = async (req, res) => {
    try{
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;
        
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate('messages');

        if(!conversation){
            return res.status(200).json([]);
        }

        const messages = conversation.messages;

        res.status(200).json(messages);
    }
    catch(err){
        console.log("Error in getMessages controller: ", err.message);
        res.status(500).json({error: 'Internal Server Error'});
    }
}