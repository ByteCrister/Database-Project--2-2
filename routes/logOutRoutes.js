const express = require('express');
const { getLogOut } = require('../controllers/logOutController');
const logOutRouter = express.Router();

logOutRouter.get('/logOut', getLogOut);

module.exports = logOutRouter;