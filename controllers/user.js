const User= require('../models/users');

function isStringinvalid(string){
    if(string ==undefined || string.length== 0){
       return true;
    }
    else{
        return false;
    }

}

exports.signup = async(req,res)=>{
    try{
        const {name,email,phonenumber,password}=req.body
    if(isStringinvalid(name)||isStringinvalid(email)||isStringinvalid(password)){
        return res.status(400).json({err:'invalid input:Something is missing'})
    }

     await User.create({name,email,phonenumber,password})
     res.status(200).json({message:'Successfully created your  account'})
    }catch(err){
        res.status(500).json({error:err});
    }
}