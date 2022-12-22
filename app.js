const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
var cors=require('cors');

const sequelize = require('./utill/database');
const User = require('./models/users');
const Expense=require('./models/expenses')
const Order= require('./models/orders');

const app = express();
app.use(cors());

const userRoutes=require('./routes/user')
const expenseRoutes=require('./routes/expense')
const purchaseRoutes=require('./routes/purchase')

app.use(bodyParser.json());

app.use('/user',userRoutes);
app.use('/expense',expenseRoutes);
app.use('/purchase', purchaseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);



sequelize.sync()
.then(()=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err)
})