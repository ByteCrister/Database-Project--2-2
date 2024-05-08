const { userQuestion } = require('../../controllers/Desktop-View-Controllers/Admin/Questions/Desktop-question-Controller');

const userQuestionsRouter = require('express').Router();

userQuestionsRouter.get('/User/Questions', userQuestion);


module.exports = userQuestionsRouter;