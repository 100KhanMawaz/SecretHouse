var jwt = require('jsonwebtoken');
const JWT_SECRET='MawazKhanGangGang';

const fetchUser=(req,res,next)=>{

    var Jwt_Token=req.header('auth-token');
    if(!Jwt_Token)
    {
      return res.status(401).json({Error:"Not Found!"});
    }
    try {
        var Userdata=jwt.verify(Jwt_Token,JWT_SECRET);
        req.user=Userdata;
        next();
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}
module.exports = fetchUser;