const UpdatePcRouter = require('express').Router();

const multer = require('multer');
const upload = multer();

const{updatePcControllerGet,  updatePcControllerPost } = require('../../controllers/Pc-Controllers/updatePcController')


UpdatePcRouter.get('/update-pc/:pc_information_No', updatePcControllerGet);


UpdatePcRouter.post('/update-pc',upload.single('productImage'), updatePcControllerPost );


module.exports = UpdatePcRouter;