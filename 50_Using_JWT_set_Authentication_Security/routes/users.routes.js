const express = require('express');
const Users = require('../controllers/users.controller');

const routers = express.Router();

routers.post('/userRegister', Users.userRegister);
routers.post('/userLogin', Users.userLogin);

module.exports = routers;