const Sequelize =require('sequelize');

const sequelize =new Sequelize('expensetracker','root','JyotiSQL876',{
    dialect:'mysql',
    host: 'localhost'
})

module.exports = sequelize;