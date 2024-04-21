const path = require('path');
const dataBase = require('../../models/DB');

const { getRamView } = require('../../controllers/Desktop-View-Controllers/Desktop-Ram-View');
const DesktopViewRouter = require('express').Router();

DesktopViewRouter.get('/Desktop/ram_id-:product_id', getRamView);

module.exports = DesktopViewRouter;
