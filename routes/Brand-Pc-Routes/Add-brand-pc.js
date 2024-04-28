const addBrandPCRouter = require('express').Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { getAddBrandPC,  postAddBrandPC } = require('../../controllers/Brand-Pc-Controllers/Add-brand-pc-controllers');

addBrandPCRouter.get('/add-brand-pc', getAddBrandPC);
addBrandPCRouter.post('/add-brand-pc', upload.single('productImage'), postAddBrandPC);

module.exports = addBrandPCRouter;
