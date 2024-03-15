const User = require("../model/userModel");
const bcrypt = require('bcryptjs');
const { generateTokenAndSetCookie } = require('../utils/generateTokens');


module.exports.login = async (req, res) => {
    try{
        const { username, password } = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid username or password"});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            profilePic: user.profilePic,
        });
    }
    catch(err){
        console.log('Error in sign up controller: ', err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

module.exports.signup = async (req, res) => {
    try{
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if(password !== confirmPassword){
            return res.status(400).json({error: 'Passwords do not match'});
        }
        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({error: 'Username already exists'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyPfp = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlPfp = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyPfp : girlPfp
        })

    if(newUser){
        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic,
        })
    }
    else{
        res.status(400).json({error: "Invalid User Data"});
    }
    }
    catch(err){
        console.log('Error in sign up controller: ', err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

module.exports.logout = async (req, res) => {

}