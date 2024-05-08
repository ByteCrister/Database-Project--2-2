const { QuestionUpdate } = require('../../controllers/Desktop-View-Controllers/Admin/Questions/Admin-Question-update');

const adminQuestionUpdate = require('express').Router();

adminQuestionUpdate.post('/update/user/question', QuestionUpdate);

module.exports = adminQuestionUpdate;