const express = require('express');
const { addProductPage, addNewProduct, getAllProducts, getProduct } = require('../controllers/product.controller');
const Product = require("../models/product.model");

const routes = express.Router();

routes.get("/add_product", addProductPage);
routes.post("/add_product", Product.uploadImage, addNewProduct);
routes.get("/view_product", getAllProducts);
routes.get("/single_product/:id", getProduct);


module.exports = routes;