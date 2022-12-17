const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
var cors=require('cors');

const sequelize = require('./utill/database');
const User = require('./models/users');
const Expense=require('./models/expenses')

const app = express();
app.use(cors());

const userRoutes=require('./routes/user')
const expenseRoutes=require('./routes/expense')

app.use(bodyParser.json());

app.use('/user',userRoutes);
app.use('/expense',expenseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User)

sequelize.sync()
.then(()=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err)
})