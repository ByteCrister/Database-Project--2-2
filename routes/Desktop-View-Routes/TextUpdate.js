const { UpdateText } = require('../../controllers/Desktop-View-Controllers/Admin/Advertise_Text/TextUpdate');
const updateTextRouter = require('express').Router();

updateTextRouter.get('/Update-Text', UpdateText);
module.exports = updateTextRouter;