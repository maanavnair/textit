const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
dotenv.config();

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
   app.listen(process.env.PORT, () => {
      console.log("Server Started at port: ", process.env.PORT);
   })
})
.catch((err) => {
   console.log(err);
})