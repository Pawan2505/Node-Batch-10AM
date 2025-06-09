const express = require('express');

const routes = express.Router();

// console.log("ROUTING IS RUNNING....")

const multer = require('multer')
// fileupload


const storage = multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null, 'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const imageUpload = multer({storage:storage}).single('image');

const crudcontroller = require('../controllers/CrudController');

routes.get('/',crudcontroller.index)
routes.post('/insertData',imageUpload, crudcontroller.adddata);
module.exports = routes;