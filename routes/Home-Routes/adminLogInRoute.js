const { getAdmin, postAdmin } = require('../../controllers/Home-Controllers/adminLogInController');
const { getAdminData } = require('../../controllers/Home-Controllers/homeRoutesControllers');
const adminLogInRouter = require('express').Router();
require('dotenv').config();

adminLogInRouter.get(process.env.Admin_data, getAdminData);
adminLogInRouter.get(process.env.Admin_Route, getAdmin);
adminLogInRouter.post(process.env.Admin_Route, postAdmin);

module.exports = adminLogInRouter;