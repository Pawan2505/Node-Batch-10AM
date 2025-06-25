const express = require('express');
const routes = express.Router();
const AdminCtl = require('../controllers/adminController');

routes.get('/', AdminCtl.dashboard);

module.exports = routes;
