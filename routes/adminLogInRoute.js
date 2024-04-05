const path = require('path');
const {dataBase} = require('../models/DB');
const { getAdmin, postAdmin } = require('../controllers/adminLogInController');

const adminLogInRouter = require('express').Router();

adminLogInRouter.get('/adminLogIn', getAdmin);
adminLogInRouter.post('/adminLogIn', postAdmin);

module.exports = adminLogInRouter;