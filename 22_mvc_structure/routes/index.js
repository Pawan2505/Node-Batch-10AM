const express = require('express');
const routes = express.Router();

const adminController = require('../controllers/AdminController');
const productController = require('../controllers/ProductController')
const contactController = require('../controllers/ContactController');

// Home route
routes.get('/', adminController.index);

routes.get('/product', productController.index);
routes.get('/contact',contactController.index)

console.log("Routing is running...");

module.exports = routes;

