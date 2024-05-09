const { userViewRouter, userReview, userQuestion, userPurchases } = require('../../controllers/Desktop-View-Controllers/Admin/Users/User.view.Controller');

const usersView = require('express').Router();
usersView.get('/Users-view-:email', userViewRouter);
usersView.get('/User/Reviews-:id', userReview);
usersView.get('/User/Questions-:id', userQuestion);
usersView.get('/User/Purchases-:id', userPurchases);

module.exports = usersView;