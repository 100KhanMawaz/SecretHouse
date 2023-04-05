const express=require('express');
const fetchUser = require('../Middleware/fetchuser');
const { body, validationResult } = require('express-validator');//Validation karn layi
const Notes  = require('../models/Notes');
const router =express.Router();
router.get('/fetchallnotes',fetchUser,async(req,res)=>{
    try {
        let id=req.user.id;
    let notes=await Notes.find({user:req.user.id}); // idhar find by id ni kar sakte qki id to user ki hai or wo to user naam se bana hua hai schema mein iski id to alag hi hogi
    res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Enternal Server Error");
    }
});
//this is an Endpoint through which we can add note here login is required;
router.post('/addnote',fetchUser,[
    body('title','Title must be atleast 3 characters').isLength({ min: 3 }),
    body('description', 'description should be atleast 5 characters').isLength({min:5}),
],async(req,res)=>{
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
       let notes= await Notes.create({
            title:req.body.title, //req.body.title will come from req.body.title ye wo title hai jo url/body mein dalke bhejenge jo form fill karte waqt title rahega jiska name ke andar html mein
            description:req.body.description,// same as above comment;
            tag:req.body.tag,// same as above comment;
            user:req.user.id//req.user.id fetch user se aayega check it out
        });
        res.send(notes);
        //req.user.name is coming from auth-token
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Enternal Server Error");
    }
});
//The user must be logged in
router.put('/updatenote/:id',fetchUser, async(req,res)=>{
    const {title,description,tag}=req.body;
    const newNote={}; // why we are not creating new note here itself it is because we were never know what a user wants to update. suppose if user provides only new description then we will update description from req.body.description and since user did'nt updated title so how will you know what to update and what not to.
    //if title diya hai user tab title ko update karo
    if(title)
    {
        newNote.title=title;
    };
    //if description diya hai user tab title ko update karo
    try {
    if(description)
    {
        newNote.description=description;
    };
    //if tag diya hai user tab title ko update karo
    if(tag)
    {
        newNote.tag=tag;
    };
    // we are checking that if user of this id which is present in the url i.e req.params.id is a valid id matlab is id se koi note hai ya nai
    var note = await Notes.findOne({_id:req.params.id}); //findOne({user--> ye jo user hai wo Notes Schema ke andar wala User hai Or :req.params.id ye wo hai jo hmlg dalenge URL mein /:id wala
    if(!note)
    {
       return res.status(404).send("Not found");
    }
    // Ab agar note exist karta hai to check karo kya ye note usi user ka hai jo logged in hai qki suppose Mawaz logged in hai uska id kch hai or wo shaban ki note ko update krna chahta hai to upar wala test to pass karlega jisme hmlg check krre ki note exist karta hai nahi qki note to shaban ka hai hi matlab shaban ka note exist karta hai par mawaz ko hmlg kaise access dede ki wo shaban ka note update kar le is liye check karenge ki mawaz jo id dale wo apna hi id dale to chaliye test karte hai...
    if(note.user.toString() !== req.user.id)
    {
        return res.status(401).send("Not Allowed");
    }
    //Ab yaha aaye hai matlab bole to sb kch theek hai
    note= await Notes.findOneAndUpdate({_id:req.params.id},{$set:newNote},{new: true}) //if don't put this ->{new:true} then finbyIdAndUpdate would have returned the previous value and not the updated value
   //note=newNote; 
   if(!note)
   {
    return res.send("Please provide a correct title");
   }
   res.json({note});
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Enternal Server Error");
    }
});
//Endpoint for deleting a note and user must be logged inn
router.delete('/deletenote/:id',fetchUser,async(req,res)=>{

    try {
        let note= await Notes.findOne({_id:req.params.id});
        if(!note)
    {
       return res.status(404).send("Not found");
    }
        //now check if this note belongs to the same user who is logged in
        if(note.user.toString() !== req.user.id)
    {
        return res.status(401).send("Not Allowed");
    }
    note=await Notes.findOneAndDelete({_id:req.params.id});
    res.json({"Success":"Note has been deleted",note:note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Enternal Server Error");
    }

});
module.exports = router;