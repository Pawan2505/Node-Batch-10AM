const AdminModel = require("../models/admin.model");
const ManagerModel = require("../models/manager.model");
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
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "pawanaktu@gmail.com",
          pass: "rpfpbrigspurulpu",
        },
      });

      const otp = Math.floor(Math.random() * 1000000);
      res.cookie("otp", otp);
      res.cookie("email", req.body.email);

      const info = await transporter.sendMail({
        from: "pawanaktu@gmail.com",
        to: req.body.email,
        subject: "Send OTP",
        text: `Your OTP is : ${otp}`,
        html: `<b>Your OTP is : ${otp}</b>`,
      });

      if (info) {
        console.log("Message sent:", info.messageId);
        return res.status(200).json({ message: "OTP sent successfully", otp });
      } else {
        return res.status(500).json({ error: "Failed to send OTP" });
      }
    } else {
      return res.status(200).json({ message: "Email is available" });
    }
  } catch (error) {
    console.error("Error occurred during email check:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports.verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    if (!otp) {
      return res.status(400).json({ error: "OTP is required" });
    }

    // Compare the OTP from the request with the one stored in the cookie
    if (otp === req.cookies.otp) {
      return res.status(200).json({ message: "OTP verified successfully" });
    } else {
      return res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error occurred during OTP verification:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports.managerRegister = async (req, res) => {
  try{

    let checkManagerEmail = await ManagerModel.findOne({ email: req.body.email });
    if (checkManagerEmail) {
      return res.status(400).json({ error: "Manager already exists" });
    }else{
      if(req.body.password !== req.body.confirm_password){
        let image = '';

        if(req.file){
          image = ManagerModel.managerImagePath + req.file.filename;
        }
        req.body.password = await bcrypt.hash(req.body.password, 10);
        req.body.image = image;
        req.body.status = 'active';
        req.body.created_date = moment().format("DD-MM-YYYY");
        req.body.updated_date = moment().format("DD-MM-YYYY");

        const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "pawanaktu@gmail.com",
          pass: "rpfpbrigspurulpu",
        },
      });

    const info = await transporter.sendMail({
        from: "pawanaktu@gmail.com",
        to: req.body.email,
        subject: "Send OTP",
        text: `Your OTP is here`,
        html: `<b>Your Credentials are:</b><br>Email: ${req.body.email}<br>`,
      });

      if (info) {
        let managerDetails = await ManagerModel.create(req.body);
        return res.status(200).json({ message: "Manager registered successfully", data: managerDetails });
      } else {
        return res.status(500).json({ error: "Failed to send OTP" });
      }
      }
    }

  }catch(error){
    console.error("Error occurred during manager registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

