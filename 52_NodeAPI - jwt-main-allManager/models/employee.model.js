const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

// ================= Schema ==================
const EmployeeSchema = new mongoose.Schema({
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
    type: String,
    default: "active",
  },
  created_date: {
    type: String,
  },
  updated_date: {
    type: String,
  },
});

// ================= Multer Config ==================
const employeeImagePath = "uploads/EmployeeImages";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, employeeImagePath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});



EmployeeSchema.statics.employeeUpload =multer({ storage: storage }).single('image');
EmployeeSchema.statics.employeeImagePath = employeeImagePath;

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
