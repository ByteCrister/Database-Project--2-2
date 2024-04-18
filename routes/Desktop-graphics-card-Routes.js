const { getDesktopGraphicsCard } = require('../controllers/Desktop-graphics-card-Controller');

const DesktopGraphicsCardRouter = require('express').Router();


DesktopGraphicsCardRouter.get('/Desktop/graphics-card-:GraphicsCardType', getDesktopGraphicsCard);
module.exports = DesktopGraphicsCardRouter;