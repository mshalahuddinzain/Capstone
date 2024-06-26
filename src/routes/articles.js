const express = require('express');
const routing = express.Router();

const { getAllArticles, addArticles } = require('../controller/articlesController');

routing.get('/', getAllArticles );

routing.post('/',addArticles);

module.exports = routing;
