const UpdatePcRouter = require('express').Router();
const{updatePcControllerGet,  updatePcControllerPost, uploadMultipart } = require('../controllers/updatePcController')


UpdatePcRouter.get('/update-pc/:pc_information_No', updatePcControllerGet);


UpdatePcRouter.post('/update-pc',uploadMultipart, updatePcControllerPost );


module.exports = UpdatePcRouter;