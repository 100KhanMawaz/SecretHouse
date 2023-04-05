//Auth wale model mein comments liukhe kuch nai samaj aaye to usme dekh lena
const mongoose = require('mongoose');
const NotesSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId, //By this we are using object id as foreign key from reference user model so whichever object id associated with the corresponding auth-token present in the header will come here for more info please please visit mongooseDocumentary>Populate
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now

    }
   
    });
    module.exports = mongoose.model('notes',NotesSchema);