const { getDesktopViews } = require('../../controllers/Pc-Controllers/Desktop-views-Controller');
const DesktopViewRouter = require('express').Router();


DesktopViewRouter.get('/Desktop/pc-:pcType', getDesktopViews);
module.exports = DesktopViewRouter;