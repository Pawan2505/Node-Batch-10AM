const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const imagePath = '/uploads/AdminImages';


const AdminSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    hobby:{
        type:Array,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        required:true
    }
});

const adminStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,"..",imagePath))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

AdminSchema.statics.uploadAdminImage = multer({ storage: adminStorage }).single('avatar');
AdminSchema.statics.adPath = imagePath;

const Admin = mongoose.model('Admin',AdminSchema);

module.exports = Admin;