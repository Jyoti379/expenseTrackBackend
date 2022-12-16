const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/signup',userController.signup);//check frontend  api call

router.post('/login',userController.login);



module.exports = router;