const { getAddRam, uploadAddRamImage, postAddRam } = require('../../controllers/Ram-Controllers/Add-ram-controllers');
const addRamRouter = require('express').Router();

addRamRouter.get('/add-ram', getAddRam);
addRamRouter.post('/add-ram', uploadAddRamImage, postAddRam);

module.exports = addRamRouter;