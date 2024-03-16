const Message = require('../model/messageModel');

module.exports.sendMessage = async(req, res) => {
    try{
        const { message } = req.body;
    }
    catch(err){
        console.log("Error in sendMessage controller: ", err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}