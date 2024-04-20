const { getAdmin, postAdmin } = require('../../controllers/Home-Controllers/adminLogInController');
const adminLogInRouter = require('express').Router();

adminLogInRouter.get('/adminLogIn', getAdmin);
adminLogInRouter.post('/adminLogIn', postAdmin);

module.exports = adminLogInRouter;