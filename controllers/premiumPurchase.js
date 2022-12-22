

const Expense=require('../models/expenses')
const User=require('../models/users')


exports.getUserLeaderboard= async (req,res)=>{
    try{
        const users= await User.findAll();
        const expenses= await  Expense.findAll();
        const totalUserExpenses={}
       
        console.log(expenses)
      
        expenses.forEach((expense)=>{
          if(totalUserExpenses[expense.userId]){
            totalUserExpenses[expense.userId]+=expense.Expenseamount;
          }
          else{
            totalUserExpenses[expense.userId]=expense.Expenseamount
          }
        })
       var userLeaderboardDetails=[]
       users.forEach((user)=>{
        userLeaderboardDetails.push({name:user.name,total_expenses:totalUserExpenses[user.id] || 0})
       })
       console.log( userLeaderboardDetails)
       //sorting the array to arrange the user
       userLeaderboardDetails.sort((a,b)=>b.total_expenses-a.total_expenses)
       res.status(200).json( userLeaderboardDetails)

    }catch(err){
      console.log(err)
    }

}