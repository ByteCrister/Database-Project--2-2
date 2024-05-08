const { getDesktopBrandPc } = require('../../controllers/Brand-Pc-Controllers/Desktop-brand-pc-Controller');

const DesktopBrandPcRouter = require('express').Router();


DesktopBrandPcRouter.get('/Desktop/brand-pc-:pcType-:priceRange-:size-:model-:highOrLow*', getDesktopBrandPc);
module.exports = DesktopBrandPcRouter;