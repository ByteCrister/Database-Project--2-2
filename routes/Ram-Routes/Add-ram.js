const addRamRouter = require('express').Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { getAddRam, postAddRam } = require('../../controllers/Ram-Controllers/Add-ram-controllers');

addRamRouter.get('/add-ram', getAddRam);
addRamRouter.post('/add-ram', upload.single('productImage'), postAddRam);

module.exports = addRamRouter;