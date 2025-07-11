const express = require('express');
const admin = require('../models/admin');
const adminCtl = require('../controllers/adminController');
const {checkAdminAuth}  = require("../middleware/auth");

const routes = express.Router();
console.log("Routing...");

// Public Routes
routes.get('/', adminCtl.SignIn);
routes.post('/checkLogin', adminCtl.checkLogin);
routes.get('/changePassword',checkAdminAuth,adminCtl.changePassword);
routes.post('/checkChangePassword', checkAdminAuth, adminCtl.checkChangePassword);
routes.get('/profile',checkAdminAuth,adminCtl.profile)
// Protected Routes (admin only)
routes.get('/dashboard', checkAdminAuth, adminCtl.dashboard);
routes.get('/add_admin', checkAdminAuth, adminCtl.add_admin);
routes.get('/view_admin', checkAdminAuth, adminCtl.view_admin);
routes.post('/insertAdminData', checkAdminAuth, admin.upload, adminCtl.insertData);
routes.get('/deleteAdmin/:id', checkAdminAuth, adminCtl.deleteData);
routes.get('/editAdmin/:id', checkAdminAuth, adminCtl.editData);
routes.post('/updateAdminData/:id', checkAdminAuth, admin.upload, adminCtl.updateData);

// Logout
routes.get('/logout', adminCtl.logout);

module.exports = routes;
