const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

 //root route
 app.get('/', (req, res) => {
    res.json("API Working");
 })

 app.listen(process.env.PORT, () => {
    console.log("Server Started at port: ", process.env.PORT);
 })