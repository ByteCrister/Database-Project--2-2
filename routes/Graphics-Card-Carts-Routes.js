const GraphicsCardCartsRouter = require('express').Router();
const { getGraphicsCardCarts } = require('../controllers/Graphics-Card-Carts-Controllers');

GraphicsCardCartsRouter.get('/Graphics-Card-Carts', getGraphicsCardCarts);
module.exports = GraphicsCardCartsRouter;