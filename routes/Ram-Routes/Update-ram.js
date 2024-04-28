const UpdateRamRouter = require('express').Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const{updateRamControllerGet,  updateRamControllerPost } = require('../../controllers/Ram-Controllers/updateRamController')


UpdateRamRouter.get('/update-ram/:ram_id', updateRamControllerGet);
UpdateRamRouter.post('/update-ram',upload.single('productImage'), updateRamControllerPost );


module.exports = UpdateRamRouter;