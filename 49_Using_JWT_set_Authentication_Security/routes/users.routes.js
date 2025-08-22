const express = require('express');
const Users = require('../controllers/users.controller');

const routers = express.Router();

routers.post('/userRegister', Users.userRegister);
routers.post('/userLogin', Users.userLogin);
// routers.get('/userRegister/:id', Users.getUserById);
// routers.put('/userRegister/:id', Users.updateUser);
// routers.delete('/userRegister/:id', Users.deleteUser);

module.exports = routers;