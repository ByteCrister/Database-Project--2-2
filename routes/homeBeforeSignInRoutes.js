const { getHome } = require('../controllers/homeRoutesControllers');

const homeRouter = require('express').Router();

homeRouter.get('/', getHome);

module.exports = homeRouter;