const Admin = require("../models/Admin");
const path = require("path");
const fs = require("fs");
module.exports.dashbord = (req, res) => {
  return res.render("dashboard");
};
module.exports.add_admin = (req, res) => {
  return res.render("add_admin");
};
module.exports.view_admin = async (req, res) => {
  try {
    let adminRecord = await Admin.find({});
    return res.render("view_admin", { adminRecord });
  } catch (err) {
    console.log("Error in fetching admin data:", err);
    return res.redirect("back");
  }
};
module.exports.insertAdminData = async (req, res) => {
  try {
    req.body.name = req.body.fname + " " + req.body.lname;

    req.body.avatar = "";

    if (req.file) {
      req.body.avatar = Admin.adPath + "/" + req.file.filename;
    }

    let adminRecord = await Admin.create(req.body);

    if (adminRecord) {
      console.log("Admin Record Inserted");
      return res.redirect("/add_admin");
    } else {
      console.log("Error in Inserting Admin Record!");
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error in Inserting Admin Record : ", err);
    return res.redirect("back");
  }
};

module.exports.deleteAdmin = async (req, res) => {
  try {
    // console.log(req.params.adId);
    let adminId = req.params.adId;

    let adminData = await Admin.findById(adminId);

    if (adminData) {
      let imgPath = path.join(__dirname, "..", adminData.avatar);
      console.log(imgPath);
      try {
         fs.unlinkSync(imgPath);
      } catch (err) {
        console.log(err);
      }
      let deleteAdmin = await Admin.findByIdAndDelete(adminId);
      if( deleteAdmin ) {
        console.log("Admin Record Deleted");
        return res.redirect('back');
      }else {
        console.log("Error in Deleting Admin Record!");
        return res.redirect('back');
      }

    }else{
      console.log("Admin Record not found")
      return res.redirect('back')
    }
  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
};
