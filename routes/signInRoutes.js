const { getSignIn , postSignIn} = require('../controllers/signInRoutesControllers');

const path = require('path');
const {dataBase} = require('../models/DB');

const signInRouters = require('express').Router();


signInRouters.get('/signIn', getSignIn);
signInRouters.post('/signIn', postSignIn);

module.exports = signInRouters;