const express = require('express');
const Admin = require('../controllers/admin.controller');
const AdminModel = require('../models/admin.model');
const ManagerModel = require('../models/manager.model');

const adminAuth = require('../config/adminAuth');

const router = express.Router();


router.post('/adminRegister',AdminModel.adminUpload,Admin.adminRegister);

router.post('/adminLogin',Admin.adminLogin);

router.get('/adminProfile',adminAuth,Admin.adminProfile);

router.post('/changePassword',adminAuth,Admin.changePassword);

router.post("/checkEmail", Admin.checkEmail);

router.post("/verifyOtp", Admin.verifyOtp);

router.post("/managerRegister", ManagerModel.managerUpload, Admin.managerRegister);

module.exports = router;
