const { deleteGraphicsCardController } = require('../../controllers/Graphics-Card-Controllers/deleteGraphicsCardController');
const deleteGraphicsCardRouter = require('express').Router();

deleteGraphicsCardRouter.get('/remove-graphics-card/:gp_card_No', deleteGraphicsCardController);
module.exports = deleteGraphicsCardRouter;