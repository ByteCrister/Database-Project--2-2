const advertiseRouter = require('express').Router();
const { getAdvertiseImages, postAdvertiseImages, HideAdvertise, deleteAdvertise, UnhideAdvertise } = require('../../controllers/Desktop-View-Controllers/Admin/Advertise_Text/AdvertiseControllers');
const multer = require('multer');
const upload = multer();

advertiseRouter.get('/Advertisements', getAdvertiseImages);
advertiseRouter.post('/Advertisements', upload.single('advertiseImages'), postAdvertiseImages);
advertiseRouter.get('/HideImage/:ID', HideAdvertise);
advertiseRouter.get('/UnhideImage/:ID', UnhideAdvertise);
advertiseRouter.get('/DeleteImage/:ID', deleteAdvertise);

module.exports = advertiseRouter;