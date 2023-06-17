const createError=require('http-errors');
const User=require('../models/user.model');
const isValid=require('../utils/validation');
const jwt=require('../utils/jwtService');

module.exports={
    register:async(req,res,next)=>{
        
        console.log(req.body);
        const {firstname,lastname,email,password,role}=req.body;
        try {
            if(!isValid(email)) 
                throw createError.BadRequest("Not a valid email");
                
            const doesExists=await User.findOne({email:email});
            if(doesExists) throw createError.Conflict(`A user with this ${email} email id already exists!!`);
            const user=new User({firstname,lastname,email,password,role});
            await user.save();
            res.status(201).json({Message:"User registered"});
        } 
        catch (error) {
            console.log(error);
            next(error);
        }    

    },
    login:async(req,res,next)=>{
        
        // Normal authentication
        const {email,password}=req.body;
        console.log(email,password);
        try {
            if(!isValid(email)) throw createError.BadRequest("Not a valid email");
            const user=await User.findOne({email:email});
            if(!user) throw createError.NotFound('User not registered');
            const isMatch = await user.isValidPassword(password)
            if (!isMatch) throw createError.Unauthorized('Username/password not valid')
            
            res.json({User:user.firstname, role:user.role});
        } 
        catch (error) {
            console.log("temp")
            next(error);
        }

    }
}