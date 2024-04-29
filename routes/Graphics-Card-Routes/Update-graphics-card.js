const UpdateGraphicsCardRouter = require('express').Router();

const multer = require('multer');
const upload = multer();

const{updateGraphicsCardControllerGet,  updateGraphicsCardControllerPost } = require('../../controllers/Graphics-Card-Controllers/updateGraphicsCardController')


UpdateGraphicsCardRouter.get('/update-graphics-card/:gp_card_No', updateGraphicsCardControllerGet);
UpdateGraphicsCardRouter.post('/update-graphics-card',upload.single('productImage'), updateGraphicsCardControllerPost );


module.exports = UpdateGraphicsCardRouter;