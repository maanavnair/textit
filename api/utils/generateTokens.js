const jwt = require('jsonwebtoken');


const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: 15*24*60*60
    })

    res.cookie("jwt", token, {
        maxAge: 15*24*60*60*1000,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    })
}

module.exports = { generateTokenAndSetCookie };