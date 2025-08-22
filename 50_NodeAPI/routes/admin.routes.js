const express = require('express');
const Admin = require('../controllers/admin.controller');

const router = express.Router();


router.post('/adminRegister',Admin.adminRegister);



module.exports = router;
