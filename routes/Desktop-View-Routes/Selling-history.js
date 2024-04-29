const { sellingHistory } = require('../../controllers/Desktop-View-Controllers/Desktop-selling-history');

const viewSellingHistory = require('express').Router();

viewSellingHistory.get('/Product-selling-history-', sellingHistory);

module.exports = viewSellingHistory ; 