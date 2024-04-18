const UpdateBrandPcRouter = require('express').Router();
const{updateBrandPcControllerGet,  updateBrandPcControllerPost, uploadBrandPCImage } = require('../controllers/updateBrandPcController')


UpdateBrandPcRouter.get('/update-brand-pc/:brand_pc_No', updateBrandPcControllerGet);
UpdateBrandPcRouter.post('/update-brand-pc',uploadBrandPCImage, updateBrandPcControllerPost );


module.exports = UpdateBrandPcRouter;