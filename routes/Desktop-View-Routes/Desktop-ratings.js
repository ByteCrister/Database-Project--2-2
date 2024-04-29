const { usersRating } = require('../../controllers/Desktop-View-Controllers/Desktop-rating-Controller');

const userRatingsRouter = require('express').Router();
userRatingsRouter.get('/User/Ratings', usersRating);

module.exports = userRatingsRouter;