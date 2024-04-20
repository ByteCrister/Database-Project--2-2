const { deleteBrandPcController } = require('../../controllers/Brand-Pc-Controllers/deleteBrandPcController');
const deleteBrandPcRouter = require('express').Router();

deleteBrandPcRouter.get('/remove-brand-pc/:brand_pc_No', deleteBrandPcController);
module.exports = deleteBrandPcRouter;