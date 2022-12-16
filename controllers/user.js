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
 exports.login= async (req,res)=>{
    try{
        const {email,password}=req.body;
        console.log(email)
        console.log(password)

        if(isStringinvalid(email)||isStringinvalid(password)){
            return res.status(400).json({message:'invalid input:Something is missing',success:false})
        }
      const user=await User.findAll({where:{email}})
      if(user.length>0){
        if(user[0].password == password){
            return res.status(200).json({success:true,message:'user login successful'})
        }
        else{
            return res.status(401).json({success:false,message:'password incorect:User not authorised'})
        }
      }else{
        return res.status(404).json({sucess:false,message:'User not found'})
      }

    }catch(err){
        res.status(500).json({success:false,message:err}); 
    }

 }