const UpdateBrandPcRouter = require('express').Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const{updateBrandPcControllerGet,  updateBrandPcControllerPost } = require('../../controllers/Brand-Pc-Controllers/updateBrandPcController')


UpdateBrandPcRouter.get('/update-brand-pc/:brand_pc_No', updateBrandPcControllerGet);
UpdateBrandPcRouter.post('/update-brand-pc',upload.single('productImage'), updateBrandPcControllerPost );


module.exports = UpdateBrandPcRouter;