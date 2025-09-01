const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

// ================= Schema ==================
const ManagerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  phone: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  created_date: {
    type: String,
  },
  updated_date: {
    type: String,
  },
});

// ================= Multer Config ==================
const managerImagePath = "uploads/ManagerImages";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, managerImagePath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});



ManagerSchema.statics.managerUpload =multer({ storage: storage }).single('image');
ManagerSchema.statics.managerImagePath = managerImagePath;

const Manager = mongoose.model("Manager", ManagerSchema);

module.exports = Manager;
