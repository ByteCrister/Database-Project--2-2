const { deletePcController } = require('../controllers/deletePcController');

const deletePcRouter = require('express').Router();

deletePcRouter.get('/remove-pc/:pc_information_No', deletePcController);

module.exports = deletePcRouter;