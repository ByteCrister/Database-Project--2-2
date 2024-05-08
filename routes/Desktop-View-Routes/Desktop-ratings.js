const { usersRating } = require('../../controllers/Desktop-View-Controllers/Admin/Rating/Desktop-rating-Controller');

const userRatingsRouter = require('express').Router();
userRatingsRouter.get('/User/Ratings', usersRating);

module.exports = userRatingsRouter;