const { adminHomeViewController } = require('../../controllers/Desktop-View-Controllers/Admin/Home/Admin-Home-View-Controller');

const adminHomeViewRouter = require('express').Router();

adminHomeViewRouter.get('/admin-home-view', adminHomeViewController);
module.exports = adminHomeViewRouter;