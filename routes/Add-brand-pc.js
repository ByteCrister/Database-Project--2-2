// Add-brand-pc.js
const { getAddBrandPC, uploadBrandPCImage, postAddBrandPC } = require('../controllers/Add-brand-pc-controllers');
const addBrandPCRouter = require('express').Router();

addBrandPCRouter.get('/add-brand-pc', getAddBrandPC);
addBrandPCRouter.post('/add-brand-pc', uploadBrandPCImage, postAddBrandPC);

module.exports = addBrandPCRouter;
