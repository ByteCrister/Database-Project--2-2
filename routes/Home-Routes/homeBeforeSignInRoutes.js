const { getHome } = require('../../controllers/Home-Controllers/homeRoutesControllers');
const homeRouter = require('express').Router();

homeRouter.get('/', getHome);

module.exports = homeRouter;