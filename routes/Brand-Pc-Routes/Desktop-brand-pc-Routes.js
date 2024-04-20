const { getDesktopBrandPc } = require('../../controllers/Brand-Pc-Controllers/Desktop-brand-pc-Controller');

const DesktopBrandPcRouter = require('express').Router();


DesktopBrandPcRouter.get('/Desktop/brand-pc-:pcType', getDesktopBrandPc);
module.exports = DesktopBrandPcRouter;