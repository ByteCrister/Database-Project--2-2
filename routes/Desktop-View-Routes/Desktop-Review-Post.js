const { postRamReview } = require('../../controllers/Desktop-View-Controllers/Desktop-Review-Ram');
const DesktopReviewPost = require('express').Router();

DesktopReviewPost.post('/Submit-Review', postRamReview);


module.exports = DesktopReviewPost;

/*************** single review post for all Products ****************/