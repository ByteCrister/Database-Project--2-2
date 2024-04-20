const { deleteRamController } = require('../../controllers/Ram-Controllers/deleteRamController');

const deleteRamRouter = require('express').Router();

deleteRamRouter.get('/remove-ram/:ram_id', deleteRamController);

module.exports = deleteRamRouter;