const express=require('express');
const { body, validationResult } = require('express-validator');//Validation karn layi
const User = require('../models/User'); //Importing User model
const router = express.Router();//router use karenge tab hi is end point ko waha index.js mein jo app.use hai waha se connect kar payenge 
var bcrypt = require('bcryptjs');
const fetchUser = require('../Middleware/fetchuser');
var jwt = require('jsonwebtoken');
const { findOne } = require('../models/User');
const JWT_SECRET='MawazKhanGangGang';

//Creating a User using :POST "/api/auth" ,and it doesn't require authentication or nor to be logged in
router.post('/createuser',[
    body('name','Invalid name').isLength({ min: 3 }),
    body('email', 'Invalid email').isEmail(),
    body('password','Invalid password').isLength({ min: 5 }),
    body('confirmPassword','ConfirmPassword should match').isLength({ min: 5 }),
],
async (req,res)=>{
    let success=false;
    //if there are errors ,return errors and bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
        
     if(req.body.confirmPassword!==req.body.password)
     return res.json({success,errors:"Password and Confirm Password should match"});
    // check whter user with this email already exists?
    let user=await User.findOne({email:req.body.email});
    if(user)
    {
        return res.status(400).json({success,errors:"Sorry a user with this email already exists"})
    }
    var salt =await bcrypt.genSaltSync(10);
   var  securePassword = await bcrypt.hashSync(req.body.password, salt);
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePassword,
        confirmPassword:req.body.confirmPassword
      });
      //The need to create this data object is that it will not accept user directly we have to pass user by putting it in an object try removing the object and place only user is jwt.sign u'll be more clear about
       const data={
           //idhar ID bhej rhe hai bs khali user rakhte to auth token jo banta wo pura user ka saara detail jaise naam email password id sb cheez ka mila kr banta isliye sirf user ko destruture karke sirf ID bheje hai sath mein naam bhi bhej sakte the lekin kam hi bheje id will be the fastest way to retrive a user
           //yaha sare jagah jo user use ho rha hai wo wahi user hai jo create ho rha h
               name:user.name,
               id:user.id
       }
      console.log(`Idhar Data display ho rha hai ${data.id} ${data.name}`);
      const AuthToken=jwt.sign(data,JWT_SECRET);
      console.log({AuthToken});
      success=true;
      res.json({success,Report:`user has been created with name ${user.name}`,AuthToken:AuthToken})
}
    catch (error) {
        console.error(error.message);
        res.status(500).send("Enternal Server Error");
    }
    //   .then(user => res.json(user))
    //   .catch(err=>{
    //       console.log(err);
    //       res.json({error:'please enter valid credentials',err})
    //   })
    }
)
//Creating a log-in /api/auth/login end point for which the user does not need to be logged in
router.post('/login',[
    body('email', 'Invalid email').isEmail(),
    body('password','password cannot be blank').exists(),
],
async (req,res)=>{
    let success=false;
    //if there are errors ,return errors and bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors:"Credentials are invalid" });
    }
    const {email,password}=req.body;
    //This is called destructuring without destrucuring we could have also done this but then we have to write req.body.email or req.body.password like this.
    try {
        const user = await User.findOne({email:email});
        // upar findone mein jo pehla email hai wo User ke andar ka email hai saara or jo dusra email hai wo abhi jo daala gaya wo hai since humlog destructuring kiye hai is liye direct likh rahe hai warna req.body.email likhte. 
        if(!user)
        {
            return res.status(400).json({success,errors:"please try to log-in with correct credentials or try Sign-up"});
        }
        const passwordCompare= await bcrypt.compare(password,user.password);
        //idhar bcrypt.compare(password,user.password); jo pehla waala password hai wo jo abhi daala gaya wo password hai i.e req.body.password or jo user.password hai wo us user ka password hai jiska abhi email ddala gaya
        if(!passwordCompare)
        {
            //passwordcompare returns boolean value so if it is 0 then this if block will execute
            return res.status(400).json({success,errors:"Sorry Please try to login with correct credentials"});
        }
        const data={
            name:user.name,
            id:user.id
    }
   const AuthToken=jwt.sign(data,JWT_SECRET);
   success=true;
   res.json({success,AuthToken})
    }
   catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
})
//Creating an EndPoint to get User Details from jwt token /api/auth/getuser end point for which the user need to be logged in
router.post('/getuser',fetchUser,async (req,res)=>{
        try {
        let ID=req.user.id;
        const user=await User.findById(ID).select("-password");
        res.send(user);
    }
   catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
})
// router.post('/getuser',async (req,res)=>{
//     try {
//     const token = req.header('auth-token');
//     if(!token)
//     {
//         res.status(401).send({error:"Please authenticate using correct auth-token"});
//     }
//     const data = jwt.verify(token,JWT_SECRET);
//     let ID=data.id;
//     const user=await User.findById(ID).select("-password");
//     res.send(user);
// }
// catch (error) {
// console.error(error.message);
// res.status(500).send("Internal Server Error");
// }
// })
module.exports = router;