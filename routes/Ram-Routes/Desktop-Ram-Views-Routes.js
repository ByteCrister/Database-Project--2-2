const { getDesktopRamViews } = require('../../controllers/Ram-Controllers/Desktop-Ram-Views-Controller');
const DesktopViewRamRouter = require('express').Router();


DesktopViewRamRouter.get('/Desktop/ram-:ramBrand', getDesktopRamViews);
module.exports = DesktopViewRamRouter;