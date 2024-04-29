const addPCRouter = require('express').Router();

const multer = require('multer');
const upload = multer();

const { getAddPc, postAddPC } = require('../../controllers/Pc-Controllers/Add-pc-controllers');


addPCRouter.get('/add-pc', getAddPc);
addPCRouter.post('/add-pc', upload.single('productImage'), postAddPC);

module.exports = addPCRouter;
