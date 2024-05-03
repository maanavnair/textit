const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes');

const { app, io, server } = require('./socket/socket');


dotenv.config();

app.use(cors({credentials: true, origin: "http://localhost:5173"}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);


 //root route
 app.get('/', (req, res) => {
    res.json("API Working");
 });
 
mongoose.connect(process.env.MONGO_URI)
.then( () => {
   server.listen(process.env.PORT, () => {
      console.log("Server Started at port: ", process.env.PORT);
   })
})
.catch((err) => {
   console.log(err);
})