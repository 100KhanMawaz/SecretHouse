const mongoose = require('mongoose');
const mongoURI= "mongodb://localhost:27017/iNoteBook2";
const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to Mongo Succesfully");
    })
}
module.exports = connectToMongo;