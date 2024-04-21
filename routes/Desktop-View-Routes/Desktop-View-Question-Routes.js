const path = require('path');
const dataBase = require('../../models/DB');

const { getRamQuestion } = require('../../controllers/Desktop-View-Controllers/Desktop-Ram-Question');
const { getRamReview } = require('../../controllers/Desktop-View-Controllers/Desktop-Ram-Review');

const DesktopViewQuestionRouter = require('express').Router();

DesktopViewQuestionRouter.get('/Ask-Question/Ram', getRamQuestion);
DesktopViewQuestionRouter.get('/Review/Ram', getRamReview);



module.exports = DesktopViewQuestionRouter;