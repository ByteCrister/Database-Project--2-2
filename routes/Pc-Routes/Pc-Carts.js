const PcCartsRouter = require('express').Router();
const { getPcCarts } = require('../../controllers/Pc-Controllers/Pc-Carts-Controllers');

PcCartsRouter.get('/Pc-Carts', getPcCarts);

module.exports = PcCartsRouter;