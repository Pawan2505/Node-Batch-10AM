const AdminModel = require("../models/admin.model");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

module.exports.adminRegister = async (req, res) => {
  try {
    console.log(req.body); // form-data text fields
    console.log(req.file); // uploaded file info

    // check if admin already exists
    let existAdmin = await AdminModel.findOne({ email: req.body.email });
    if (existAdmin) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    // check passwords
    if (req.body.password !== req.body.confirm_password) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // hash password
    req.body.password = await bcrypt.hash(req.body.password, 10);

    // add image if uploaded
    if (req.file) {
      req.body.image = AdminModel.adminImagePath + req.file.filename;
    }

    // add extra fields
    req.body.created_date = new Date();
    req.body.updated_date = new Date();
    req.body.status = "Active";

    // save admin
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

    // check if admin exists
    let existAdmin = await AdminModel.findOne({ email: req.body.email });
    if (!existAdmin) {
      return res.status(400).json({ error: "Admin does not exist" });
    }

    // check password
    const isMatch = await bcrypt.compare(
      req.body.password,
      existAdmin.password
    );
    if (isMatch) {
      let token = jwt.sign({ adminToken: existAdmin }, "AdminRNW", {
        expiresIn: "1h",
      });
      return res.status(200).json({
        message: "Admin logged in successfully ",
        token: token,
      });
    } else {
      return res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error occurred during admin login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.adminProfile = async (req, res) => {
  try {
    return res
      .status(200)
      .json({
        message: "Admin profile retrieved successfully",
        data: req.user,
      });
  } catch (error) {
    console.error("Error occurred during admin profile retrieval:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.changePassword = async (req, res) => {
  try {
    console.log(req.body);

    const { cpass, npass, confirmPass } = req.body;

    // Check if current password is correct
    const isMatch = await bcrypt.compare(
      req.body.cpass,
      req.user.adminToken.password
    );

    if (!isMatch) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    // Prevent reusing the same password
    if (cpass === npass) {
      return res
        .status(400)
        .json({
          error: "New password must be different from current password",
        });
    }

    // Confirm new password match
    if (npass !== confirmPass) {
      return res
        .status(400)
        .json({ error: "New password and confirm password do not match" });
    }

    // Hash and update
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

module.exports.checkEmail = async (req, res) => {
  try {
    console.log(req.body);

    let emailExist = await AdminModel.findOne({ email: req.body.email });
    if (emailExist) {
      // Create a test account or replace with real credentials.
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "pawanaktu@gmail.com",
          pass: "rpfpbrigspurulpu",
        },
      });

      // Wrap in an async IIFE so we can use await.
      (async () => {
        const otp = Math.floor(Math.random() * 1000000);
        const info = await transporter.sendMail({
          from: "pawanaktu@gmail.com",
          to: req.body.email,
          subject: "Send OTP",
          text: `Your OTP is : ${otp}`, // plain‑text body
          html: `<b>Your OTP is : ${otp}</b>`, // HTML body
        });

        console.log("Message sent:", info.messageId);
      })();

      return res.status(400).json({ error: "Email already exists" });
    } else {
      return res.status(200).json({ message: "Email is available" });
    }
  } catch (error) {
    console.error("Error occurred during email check:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.