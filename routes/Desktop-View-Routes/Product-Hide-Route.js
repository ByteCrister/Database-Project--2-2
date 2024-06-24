const { HidePc, UnhidePc, BrandPcHide, UnhideBrandPc, GraphicsCardHide, UnhideGraphicsCard, RamHide, UnhideRam } = require('../../controllers/Desktop-View-Controllers/Admin/Product-Hide/Product-Hide-Controllers');

const productHideRouter = require('express').Router();

productHideRouter.get('/Hide/Pc/:productID', HidePc);
productHideRouter.get('/Unhide/Pc/:productID', UnhidePc);

productHideRouter.get('/Hide/Brand-Pc/:productID', BrandPcHide);
productHideRouter.get('/Unhide/Brand-Pc/:productID', UnhideBrandPc);

productHideRouter.get('/Hide/Graphics-Card/:productID', GraphicsCardHide);
productHideRouter.get('/Unhide/Graphics-Card/:productID', UnhideGraphicsCard);


productHideRouter.get('/Hide/Ram/:productID', RamHide);
productHideRouter.get('/Unhide/Ram/:productID', UnhideRam);

module.exports = productHideRouter;