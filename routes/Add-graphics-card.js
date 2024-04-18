const { getAddGraphicsCard, uploadGraphicsCardImage, postAddGraphicsCard } = require('../controllers/Add-graphics-card-controllers');
const addGraphicsCardRouter = require('express').Router();

addGraphicsCardRouter.get('/add-graphics-card', getAddGraphicsCard);
addGraphicsCardRouter.post('/add-graphics-card', uploadGraphicsCardImage, postAddGraphicsCard);

module.exports = addGraphicsCardRouter;
