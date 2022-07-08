const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/UMS") // UMS is the name of the database

const express = require('express');
const app = express();

const port = process.env.PORT || 4200;

const userRoute=require('./routes/userRoute');
app.use('/', userRoute);

app.listen(port, () => {
    console.log(`Server is running at port number: ${port}`);
  });