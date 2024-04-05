const PcCartsRouter = require('express').Router();
const path = require('path');
const  dataBase  = require('../models/DB');
const { getPcCarts } = require('../controllers/Pc-Carts-Controllers');

PcCartsRouter.get('/Pc-Carts', getPcCarts);


module.exports = PcCartsRouter;