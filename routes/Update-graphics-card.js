const UpdateGraphicsCardRouter = require('express').Router();
const{updateGraphicsCardControllerGet,  updateGraphicsCardControllerPost, uploadGraphicsCardImage } = require('../controllers/updateGraphicsCardController')


UpdateGraphicsCardRouter.get('/update-graphics-card/:gp_card_No', updateGraphicsCardControllerGet);
UpdateGraphicsCardRouter.post('/update-graphics-card',uploadGraphicsCardImage, updateGraphicsCardControllerPost );


module.exports = UpdateGraphicsCardRouter;