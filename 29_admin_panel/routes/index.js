const express = require('express');


const routes = express.Router();

console.log("Routing...")



const adminCtl = require('../controllers/adminController')

const Admin = require('../models/Admin');

routes.get('/',adminCtl.dashbord);
routes.get('/add_admin',adminCtl.add_admin);
routes.get('/view_admin',adminCtl.view_admin);

routes.post("/insertAdminData",Admin.uploadAdminImage, adminCtl.insertAdminData);
routes.get('/deleteAdmin/:adId',adminCtl.deleteAdmin);

module.exports = routes;