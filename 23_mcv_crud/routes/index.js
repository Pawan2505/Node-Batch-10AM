const express = require('express');
const routes = express.Router();

const multer = require('multer');
const path = require('path');

// Multer file upload config
const filestorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); 
    }
});

const imageUpload = multer({ storage: filestorage }).single('image');

const crudcontroller = require('../controllers/CrudController');

// Routes
routes.get('/', crudcontroller.index);
routes.post('/insertData', imageUpload, crudcontroller.adddata);
routes.get('/editData', crudcontroller.editdata)
routes.get('/deleteData',crudcontroller.deletedata)

module.exports = routes;
