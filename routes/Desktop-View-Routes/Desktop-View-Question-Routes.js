const path = require('path');
const dataBase = require('../../models/DB');

const { getQuestion } = require('../../controllers/Desktop-View-Controllers/Desktop-Question');
const { getReview } = require('../../controllers/Desktop-View-Controllers/Desktop-Review');

const DesktopViewQuestionRouter = require('express').Router();

DesktopViewQuestionRouter.get('/Ask-Question', getQuestion);
DesktopViewQuestionRouter.get('/Review', getReview);



module.exports = DesktopViewQuestionRouter;