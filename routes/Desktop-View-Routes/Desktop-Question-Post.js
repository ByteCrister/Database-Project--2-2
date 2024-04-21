const { DesktopQuestionPostController } = require('../../controllers/Desktop-View-Controllers/Desktop-Question-Post-Controller');
const DesktopQuestionPost = require('express').Router();

DesktopQuestionPost.post('/Submit-Question', DesktopQuestionPostController);

module.exports = DesktopQuestionPost;


/*************** single question post for all Products ****************/