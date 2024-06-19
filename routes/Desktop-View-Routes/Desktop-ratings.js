const { usersRating, dropUserRating } = require('../../controllers/Desktop-View-Controllers/Admin/Rating/Desktop-rating-Controller');

const userRatingsRouter = require('express').Router();
userRatingsRouter.get('/User/Ratings', usersRating);
userRatingsRouter.get('/User/Ratings/Delete/:category/:id/:sortCategory/:sortBy', dropUserRating);

module.exports = userRatingsRouter;