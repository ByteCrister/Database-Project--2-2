const { userQuestion } = require('../../controllers/Desktop-View-Controllers/Desktop-question-Controller');

const userQuestionsRouter = require('express').Router();

userQuestionsRouter.get('/User/Questions', userQuestion);


module.exports = userQuestionsRouter;