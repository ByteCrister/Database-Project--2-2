const { getAdmin, postAdmin } = require('../../controllers/Home-Controllers/adminLogInController');
const adminLogInRouter = require('express').Router();

adminLogInRouter.get('/admin/jhvvytcsxersrewqawquygtoiuhiohhgiuguygfuyf', getAdmin);
adminLogInRouter.post('/admin/jhvvytcsxersrewqawquygtoiuhiohhgiuguygfuyf', postAdmin);

module.exports = adminLogInRouter;