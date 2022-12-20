const Expense=require('../models/expenses');
const jwt = require('jsonwebtoken');

function isStringinvalid(string){
  if(string ==undefined || string.length== 0){
     return true;
  }
  else{
      return false;
  }

}
exports.addExpenses= async(req,res,next)=>{
    try{
      const {Expenseamount,description,catagory}=req.body
      
      if(isStringinvalid(Expenseamount)||isStringinvalid(description)){
        return res.status(400).json({err:'invalid input:Something is missing'})
    }

   //can be written: const data =await req.createExpense({Expenseamount:Expenseamount,description:description,catagory:catagory})

    const data= await Expense.create({Expenseamount:Expenseamount,description:description,catagory:catagory,userId:req.user.id});
      res.status(201).json({expenseDetails:data,success:true,message:'Expense added'});
    }catch(err){
      res.status(500).json({error:err})
    }
}

exports.getExpenses = async(req,res,next)=>{
    try{
    const expenses = await Expense.findAll({where:{userId:req.user.id}});

    console.log(expenses);
    res.status(200).json({expenseDetails:expenses});
  }catch(err){
    console.log(err)
    res.status(500).json({error:err});
  }
  }

  exports.deleteExpense=async(req,res,next)=>{
    try{
    if(req.params.id=='undefined'){
        console.log('id is missing');
       return  res.status(400).json({error:'id is missing'});
  
    }
    const expenseId=req.params.id;
    await Expense.destroy({where:{id:expenseId, userId:req.user.id}}).then((numRows)=>{
      if(numRows==0){
        return res.status(404).json({success:false,message:'expense not belongs to User'})
      }
     return res.sendStatus(200).json({success:true,message:"deleted successfully"});
    }).catch(err=>{
      console.log(err)
    })
    
   }catch(err){
    console.log(err)
      res.status(500).json({error:err});
      
    }
  }
