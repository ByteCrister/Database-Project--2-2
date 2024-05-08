const { getAdminQuestion, postAdminQuestion } = require('../../controllers/Desktop-View-Controllers/Admin/Questions/Admin-Question-Replay-Controller');

const AdminQuestion = require('express').Router();

AdminQuestion.get('/Answer-Questions', getAdminQuestion);
AdminQuestion.post('/Answer-Questions', postAdminQuestion);

module.exports = AdminQuestion;