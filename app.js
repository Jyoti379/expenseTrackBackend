const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
var cors= require('cors');


const sequelize = require('./utill/database');
const User = require('./models/users');
const Expense=require('./models/expenses')
const Order= require('./models/orders');
const ForgetPassword=require('./models/forgetpassword');

const app = express();
const dotenv = require('dotenv');

dotenv.config();

app.use(cors());


const userRoutes=require('./routes/user')
const expenseRoutes=require('./routes/expense')
const purchaseRoutes=require('./routes/purchase')
const premiumPurchaseRoutes=require('./routes/premiumPurchase');
const resetpasswordRoutes=require('./routes/resetpassword');

app.use(bodyParser.json());

app.use('/user',userRoutes);
app.use('/expense',expenseRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/premium', premiumPurchaseRoutes);
app.use('/password',resetpasswordRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgetPassword);
ForgetPassword.belongsTo(User)



sequelize.sync()
.then(()=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err)
})