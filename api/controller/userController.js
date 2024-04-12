const User = require("../model/userModel");


module.exports.getUsersForSidebar = async (req, res) => {
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filteredUsers);
    }
    catch(err){
        console.log("Error in getUsersForSideBar controller: ", err.message);
        res.status(500).json({error: 'Internal Serevr Error'});
    }
}