const createError=require('http-errors');
const Application=require('../models/application.model');
const Center=require('../models/center.model');

module.exports={
    createApplication: async (req,res,next)=>{
        const {email,username,age,centerID}=req.body;
        try{
            // checking number of dosages in center with id CenterID
            const dosages = await Center.findById(centerID)
            console.log(dosages)

            // checking if user has already applied
            if(Application.find({email:email})) throw createError.Conflict(`${email} has already applied`);

            // creating application
            const application=new Application({email,username,age,center});
            const result=await application.save();
            res.status(201).json(result);
        }catch(err){
            next(err);
        }
    },
    getApplications: async (req,res,next)=>{
        try{
            const result=await Application.find();
            res.status(200).json(result);
        }catch(err){
            next(err);
        }
    },
    getApplicationByCenter: async (req,res,next)=>{
        try{
            const result=await Application.find({centerID:req.params.centerID});
            res.status(200).json(result);
        }catch(err){
            next(err);
        }
    }
}