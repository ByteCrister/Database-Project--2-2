const path = require('path');
const { getAddPc, uploadMultipart, postAddPC } = require('../controllers/Add-pc-controllers');
const addPCRouter = require('express').Router();

addPCRouter.get('/add-pc', getAddPc);
addPCRouter.post('/add-pc', uploadMultipart, postAddPC);

module.exports = addPCRouter;
