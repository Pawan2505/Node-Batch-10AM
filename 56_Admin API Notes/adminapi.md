# Admin API

### Step 1: **app.js**

```js
app.use('/', require('./routes/index'));
```

---

### Step 2: **routes/index.js**

```js
const express = require('express');
const router = express.Router();

router.use("/admin",require("./admin.routes"));

module.exports = router;
```

---

### Step 3: **routes/admin.routes.js**

```js
const express = require('express');
const Admin = require('../controllers/admin.controller');
const AdminModel = require('../models/admin.model');

const adminAuth = require('../config/adminAuth');

const router = express.Router();

router.post('/adminRegister',AdminModel.adminUpload,Admin.adminRegister);

router.post('/adminLogin',Admin.adminLogin);

router.get('/adminProfile',adminAuth,Admin.adminProfile);

router.post('/changePassword',adminAuth,Admin.changePassword);

module.exports = router;
```

---

### Step 4: **config/adminAuth.js**

```js
const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
  const token = req.headers["authorization"];
  console.log("Authorization Token:", token);
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try{
    let decoded = jwt.verify(token.slice(7,token.length), "AdminRNW");
    req.user = decoded;
    next();
  }catch(error){
    return res.status(401).json({ error: "Invalid Token" });
  }
};

module.exports = adminAuth;
```

---

### Step 5: **controller/admin.controller.js**

```js
const AdminModel = require("../models/admin.model");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");

module.exports.adminRegister = async (req, res) => {
  try {
    console.log(req.body); // form-data text fields
    console.log(req.file); // uploaded file info

    let existAdmin = await AdminModel.findOne({ email: req.body.email });
    if (existAdmin) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    if (req.body.password !== req.body.confirm_password) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);

    if (req.file) {
      req.body.image = AdminModel.adminImagePath + req.file.filename;
    }

    req.body.created_date = new Date();
    req.body.updated_date = new Date();
    req.body.status = "Active";

    let adminData = await AdminModel.create(req.body);

    return res.status(201).json({
      message: "Admin registered successfully",
      data: adminData,
    });
  } catch (error) {
    console.error("Error occurred during admin registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports.adminLogin = async (req, res) => {
  try {
    console.log(req.body); 
    console.log(req.file);

    let existAdmin = await AdminModel.findOne({ email: req.body.email });
    if (!existAdmin) {
      return res.status(400).json({ error: "Admin does not exist" });
    }

    const isMatch = await bcrypt.compare(req.body.password, existAdmin.password);
    if (isMatch) {
      let token = jwt.sign({adminToken:existAdmin},"AdminRNW",{expiresIn:'1h'});
      return res.status(200).json({
        message: "Admin logged in successfully ",
        token: token
      });
    }else{
      return res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error occurred during admin login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports.adminProfile = async (req, res) => {
  try{
    return res.status(200).json({message:"Admin profile retrieved successfully", data:req.user})
  }catch(error){
    console.error("Error occurred during admin profile retrieval:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}


module.exports.changePassword = async (req, res) => {
  try {
    console.log(req.body);

    const { cpass, npass, confirmPass } = req.body;

    const isMatch = await bcrypt.compare(req.body.cpass, req.user.adminToken.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    if (cpass === npass) {
      return res.status(400).json({ error: "New password must be different from current password" });
    }

    if (npass !== confirmPass) {
      return res.status(400).json({ error: "New password and confirm password do not match" });
    }

    const hashPass = await bcrypt.hash(npass, 10);
    const updatePass = await AdminModel.findByIdAndUpdate(
      req.user.adminToken._id,
      { password: hashPass },
      { new: true }
    );

    if (updatePass) {
      return res.status(200).json({ message: "Password changed successfully" });
    } else {
      return res.status(500).json({ error: "Failed to update password" });
    }

  } catch (error) {
    console.error("Error occurred during password change:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
```

---

### Step 6: **models/admin.model.js**

```js
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
```

---

