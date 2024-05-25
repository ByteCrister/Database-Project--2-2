const { getAdmin, postAdmin } = require('../../controllers/Home-Controllers/adminLogInController');
const adminLogInRouter = require('express').Router();
require('dotenv').config();

adminLogInRouter.get(process.env.Admin_Route, getAdmin);
adminLogInRouter.post(process.env.Admin_Route, postAdmin);

module.exports = adminLogInRouter;