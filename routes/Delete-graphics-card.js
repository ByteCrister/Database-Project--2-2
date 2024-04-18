const { deleteGraphicsCardController } = require('../controllers/deleteGraphicsCardController');
const deleteGraphicsCardRouter = require('express').Router();

deleteGraphicsCardRouter.get('/remove-graphics-card/:gp_card_No', deleteGraphicsCardController);
module.exports = deleteGraphicsCardRouter;