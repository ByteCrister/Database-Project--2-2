const { postReview } = require('../../controllers/Desktop-View-Controllers/Admin/Review/Desktop-Review-Post-Controller');
const DesktopReviewPost = require('express').Router();

DesktopReviewPost.post('/Submit-Review', postReview);


module.exports = DesktopReviewPost;

/*************** single review post for all Products ****************/