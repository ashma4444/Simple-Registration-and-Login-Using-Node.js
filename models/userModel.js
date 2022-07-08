const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },

    lastname:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    mobile:{
        type:String,
        required:true
    },

    image:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    isAdmin:{
        type:Number,
        required:true
    }

});

module.exports=new mongoose.model("User", userSchema);