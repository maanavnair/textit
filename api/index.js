const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const mongoose = require('mongoose');
const cookiesParser = require('cookie-parser');
const cookieParser = require('cookie-parser');
const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes)


 //root route
 app.get('/', (req, res) => {
    res.json("API Working");
 });
 
mongoose.connect(process.env.MONGO_URI)
.then( () => {
   app.listen(process.env.PORT, () => {
      console.log("Server Started at port: ", process.env.PORT);
   })
})
.catch((err) => {
   console.log(err);
})