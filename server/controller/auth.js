import User from '../model/user.js'
import jwt from 'jsonwebtoken'
import dotnev from 'dotenv'


import {hashPassword, comparePassword} from '../helpers/auth.js'


dotnev.config();

export const register =  async (req, res) => {
    try{
    const {name,email, password} = req.body;

    if(!name.trim()){
        return res.json({error:"Name cannot be blank"});
    }
    if(!email){
        return res.json({error: "Email is taken"});
    }
    if(!password || password.length <6){
        return res.json({error:"Password dont meet the standards"});
    }

    const existingUser=  await User.findOne({email})

    if(existingUser){
        return res.json({error:"Email is in use"});
    }

    const hashedpassword=  await hashPassword(password);
    
    const user=await new User({name,email,password: hashedpassword}).save()
    const token = jwt.sign({_id:user._id}, process.env.JWT_secret,{expiresIn:"7d", })
        res.json({
            user: {
                name : user.name,
                email: user.email,
                role : user.role,
                address: user.address
            },
            token
        });       
        console.log(user);
     
    } catch(err) {
        console.log("encountered error")
        console.log(err)
    }
}

export const login =  async (req, res) => {
        try{
        const {email, password} = req.body;
    
        if(!email){
            return res.json({error: "Email is taken"});
        }
        if(!password || password.length <6){
            return res.json({error:"Password dont meet the standards"});
        }
    
        const loginUser=  await User.findOne({email})
    
        if(!loginUser){
            return res.json({error:"Email is incorrect"});
        }

   
        const matchpassword= await comparePassword(password, loginUser.password);
        
        if(!matchpassword){
            return res.json({error:"password is incorrect"});
        }

        
        const token = jwt.sign({_id:loginUser._id}, process.env.JWT_secret,{expiresIn:"7d", })
            res.json({
                user: {
                    name : loginUser.name,
                    email: loginUser.email,
                    role : loginUser.role,
                    address: loginUser.address
                },
                token
            });       
        //    console.log(loginUser);
         
        } catch(err) {
            console.log("encountered error")
            console.log(err)
        }
    

    // res.json({
    //     data: "Ashish Amit ajay alok from controller",
    // });
}

export const secret = async (req,res)=>{

    res.json({message: req.user});
}