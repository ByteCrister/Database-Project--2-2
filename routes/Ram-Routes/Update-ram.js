const UpdateRamRouter = require('express').Router();
const{updateRamControllerGet,  updateRamControllerPost, uploadRamImage } = require('../../controllers/Ram-Controllers/updateRamController')


UpdateRamRouter.get('/update-ram/:ram_id', updateRamControllerGet);
UpdateRamRouter.post('/update-ram',uploadRamImage, updateRamControllerPost );


module.exports = UpdateRamRouter;