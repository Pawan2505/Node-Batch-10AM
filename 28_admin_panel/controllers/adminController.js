const Admin = require("../models/Admin");

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
