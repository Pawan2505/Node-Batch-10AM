const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');

const adminImage = 'uploads/AdminImages/';

const AdminSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    password:{
        type:String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    created_date:{
        type: Date,
        required: true,
    },
    updated_date:{
        type: Date,
        required: true,
    }

})


const adminStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', adminImage));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

AdminSchema.statics.adminUpload = multer({ storage: adminStorage }).single('image');
AdminSchema.statics.adminImagePath = adminImage;

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;