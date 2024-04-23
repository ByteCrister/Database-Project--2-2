
const { getRamView } = require('../../controllers/Desktop-View-Controllers/Desktop-Ram-View');
const { getPcView } = require('../../controllers/Desktop-View-Controllers/Desktop-Pc-View');
const { getBrandPcView } = require('../../controllers/Desktop-View-Controllers/Desktop-Brand-Pc-View');
const { getGraphicsCardView } = require('../../controllers/Desktop-View-Controllers/Desktop-Graphics-View');
const DesktopViewRouter = require('express').Router();

DesktopViewRouter.get('/Desktop/Ram_id-:product_id', getRamView);
DesktopViewRouter.get('/Desktop/Pc_id-:product_id', getPcView);
DesktopViewRouter.get('/Desktop/Brand-Pc_id-:product_id', getBrandPcView);
DesktopViewRouter.get('/Desktop/Graphics-Card_id-:product_id', getGraphicsCardView);

module.exports = DesktopViewRouter;
