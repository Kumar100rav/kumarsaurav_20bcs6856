const jwt = require('jsonwebtoken');
let secret = process.env.SECRET;

const encode=(email)=>{
    const token = jwt.sign({
        email: email
    }, secret, {expiresIn: "1h"});
    return token;
}

const decode=(data)=>{
    console.log("Decode token")
}

const verificationCode=(data)=>{
    const token = jwt.sign({
        email: email
    }, secret, {expiresIn: "7d"});
    return token;
}


module.exports={
    encode,
    decode,
    verificationCode
}