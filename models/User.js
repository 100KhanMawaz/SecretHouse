const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({ // This is defination of schema after that we have to make a model for this schema
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now

    }
   
    });
    
    module.exports = mongoose.model('user',UserSchema); //Or ye bana model for the schema