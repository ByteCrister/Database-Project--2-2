const { getLogIn, postLogIn } = require('../controllers/logInRoutesControllers');
const {dataBase} = require('../models/DB');
const path = require('path');

const logInRoute = require('express').Router();


logInRoute.get('/logIn', getLogIn);
logInRoute.post('/logIn', postLogIn);


module.exports = logInRoute;