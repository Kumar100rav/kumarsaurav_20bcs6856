const express=require('express');
const morgan=require('morgan');
const createError=require('http-errors');
require('dotenv').config();
const auth=require('./routes/auth.routes');
const connectDB = require('./utils/connectDb');
const port=process.env.PORT;
const app=express();
const cors = require('cors');

app.use(cors());   
app.use(morgan('dev'));
app.use(express.json());
app.use('/auth',auth);
app.use('/centres', require('./routes/centre.routes'));
app.use('/applications',require('./routes/application.routes'));
connectDB();

app.use(async(req,res,next)=>{
    next(createError.NotFound('This route does not exists'));
})

app.use((err,req,res,next)=>{
    res.status(err.status||500 );
    res.send({
        error:{
            status:err.status||500,
            message:err.message,
        }
    })
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
