const BrandPcCartsRouter = require('express').Router();
const { getBrandPcCarts } = require('../../controllers/Brand-Pc-Controllers/Brand-Pc-Carts-Controller');

BrandPcCartsRouter.get('/Brand-PC-Carts', getBrandPcCarts);
module.exports = BrandPcCartsRouter;