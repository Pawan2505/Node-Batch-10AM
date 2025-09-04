const ManagerModel = require("../models/manager.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const nodemailer = require("nodemailer");

const EmployeeModel = require("../models/employee.model");

module.exports.managerLogin = async(req, res) => {
    try{
        let existManager = await ManagerModel.findOne({ email: req.body.email });

        if(existManager){
            if( await bcrypt.compare(req.body.password, existManager.password) ){
                let managerToken = jwt.sign({managerData: existManager}, "RNWManager", { expiresIn: "1h" });
                res.status(200).json({ 
                    message: "Manager logged in successfully",
                    token: managerToken
                 });
            }
        }

    }catch(error){
        console.error("Error occurred during manager login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports.managerProfile = async(req, res) => {
    try{
        return res.status(200).json({
            message: "Manager profile fetched successfully",
            managerData: req.user
        });

    }catch(error){
        console.error("Error occurred while fetching manager profile:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


module.exports.changePassword = async(req, res) => {
    try{

        if(await bcrypt.compare(req.body.currentpassword, req.user.password)){
            let newHashedPassword = await bcrypt.hash(req.body.newPassword, 10);
            await ManagerModel.findByIdAndUpdate(req.user._id, { password: newHashedPassword });
            return res.status(200).json({ message: "Password changed successfully" });
        }else{
            return res.status(400).json({ message: "Old password is incorrect" });
        }

    }catch(error){
        console.error("Error occurred while changing password:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


module.exports.employeeRegister = async(req, res) => {
    try{
        let existEmployee = await EmployeeModel.findOne({ email: req.body.email });

        if(existEmployee){
            return res.status(400).json({ message: "Employee already exists" });
        }else{
            let image = "";

            if(req.file){
                image = EmployeeModel.employeeImagePath + "/" + req.file.filename;
            }

            req.body.image = image;
            req.body.password = await bcrypt.hash(req.body.password, 10);
            req.body.status = "active";
            req.body.created_date = moment().format("DD-MM-YYYY hh:mm:ss A");
            req.body.updated_date = moment().format("DD-MM-YYYY hh:mm:ss A");
            
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
          subject: "Employee Registration",
          text: "You have been registered as an employee.",
          html: "<b>You have been registered as an employee.</b> Your email is " + req.body.email,
        });
        if(info){
          let employeeDetails = await EmployeeModel.create(req.body);
          return res.status(201).json({ message: "Employee registered successfully", data: employeeDetails });
        }else{
          return res.status(500).json({ error: "Failed to send registration email" });
        }
        }

    }catch(error){
        console.error("Error occurred during employee registration:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}