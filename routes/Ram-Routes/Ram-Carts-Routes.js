const RamCartsRouter = require('express').Router();
const { getRamCarts } = require('../../controllers/Ram-Controllers/Ram-Carts-Controllers');

RamCartsRouter.get('/Ram-Carts', getRamCarts);
module.exports = RamCartsRouter;
