
const { getRamView } = require('../../controllers/Desktop-View-Controllers/Ram/Desktop-Ram-View');
const { getPcView } = require('../../controllers/Desktop-View-Controllers/Pc/Desktop-Pc-View');
const { getBrandPcView } = require('../../controllers/Desktop-View-Controllers/Brand-Pc/Desktop-Brand-Pc-View');
const { getGraphicsCardView } = require('../../controllers/Desktop-View-Controllers/Graphics-Card/Desktop-Graphics-View');
const DesktopViewRouter = require('express').Router();

DesktopViewRouter.get('/Desktop/Ram_id-:product_id', getRamView);
DesktopViewRouter.get('/Desktop/Pc_id-:product_id', getPcView);
DesktopViewRouter.get('/Desktop/Brand-Pc_id-:product_id', getBrandPcView);
DesktopViewRouter.get('/Desktop/Graphics-Card_id-:product_id', getGraphicsCardView);

module.exports = DesktopViewRouter;
