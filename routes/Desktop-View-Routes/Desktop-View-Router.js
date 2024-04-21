const path = require('path');
const DesktopViewRouter = require('express').Router();

DesktopViewRouter.get('/Desktop/ram_id-:product_id', (request, response) => {
    response.render(path.join(__dirname, '/../../public/Desktop-Ram-View.ejs'));
});

module.exports = DesktopViewRouter;
