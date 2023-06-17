const mongoose=require('mongoose');
const Schema=mongoose.Schema;

// Define your schema
const appSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username:{
        type:String,
        required:true
    },
    age: {
        type: Number,
        required: true
    },
    centreID:{
        type: Schema.Types.ObjectId,
        ref: 'centre',
        required: true
    }
});

const application=mongoose.model('application',appSchema);

module.exports=application;