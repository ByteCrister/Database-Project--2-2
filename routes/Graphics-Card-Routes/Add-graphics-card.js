const { getAddGraphicsCard, postAddGraphicsCard } = require('../../controllers/Graphics-Card-Controllers/Add-graphics-card-controllers');

const multer = require('multer');
const upload = multer();

const addGraphicsCardRouter = require('express').Router();

addGraphicsCardRouter.get('/add-graphics-card', getAddGraphicsCard);
addGraphicsCardRouter.post('/add-graphics-card', upload.single('productImage'), postAddGraphicsCard);

module.exports = addGraphicsCardRouter;
