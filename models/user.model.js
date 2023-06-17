const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const bcrypt=require('bcrypt');

const userSchema=new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
      type:String,
      required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    profilePicture:{
      type:String,
      required:false
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String, 
        enum:['user','admin'],
    }
    // status: {
    //   type: String, 
    //   enum: ['Pending', 'Active'],
    //   default: 'Pending'
    // },
    // confirmationCode: { 
    //   type: String, 
    //   unique: true,
    //   required:false
    // }
})

userSchema.pre('save',async function(next){
    try {
        if (this.isNew) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(this.password, salt)
            this.password = hashedPassword
          }
        next();
    } catch (error) {
      next(error);
    }
})

userSchema.methods.isValidPassword = async function (password) {
    try {
      return await bcrypt.compare(password, this.password)
    } catch (error) {
      throw error
    }
  }

const User=mongoose.model('user',userSchema);

module.exports=User;