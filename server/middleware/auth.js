import jwt from 'jsonwebtoken'
import User from '../model/user.js'


export const requireSignIn=(req, res, next)=>{
    console.log(req.headers)
    
    try{

       const Authorized =  jwt.verify(req.headers.authorization, process.env.JWT_secret)
        console.log(Authorized);
        req.user = Authorized;

        next()
    }catch(err){
        return res.status(401).json(err);


    }
}

export const IsAdmin= async (req, res, next)=>{
    try{
        const user= await User.findById(req.user._id);
        if(user.role!==1){
            return res.status(401).send("UnAuthorised")
        } else {
            next()
        }   
    }catch(err){
        return res.status(401).json(err);
    }
}