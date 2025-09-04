const express = require("express");
const Manager = require("../controllers/manager.controller");
const ManagerAuth = require('../config/managerAuth');

const EmployeeModel = require("../models/employee.model");

const router = express.Router();

router.post('/managerLogin', Manager.managerLogin);
router.get('/managerProfile', ManagerAuth, Manager.managerProfile);
router.put('/changePassword', ManagerAuth, Manager.changePassword);
router.post('/employeeRegister', ManagerAuth, EmployeeModel.employeeUpload, Manager.employeeRegister);

module.exports = router;