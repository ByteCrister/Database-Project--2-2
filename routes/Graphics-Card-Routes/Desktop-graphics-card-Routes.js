const { getDesktopGraphicsCard } = require('../../controllers/Graphics-Card-Controllers/Desktop-graphics-card-Controller');

const DesktopGraphicsCardRouter = require('express').Router();


DesktopGraphicsCardRouter.get('/Desktop/graphics-card-:GraphicsCardType-:priceRange-:size-:model-:highOrLow*', getDesktopGraphicsCard);
module.exports = DesktopGraphicsCardRouter;