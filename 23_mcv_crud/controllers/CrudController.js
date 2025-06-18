const adminTbl = require("../models/adminTbl");
const path = require("path");
const fs = require('fs')


const deletedata = (req,res)=>{
     const id = req.query.id;
  // console.log(id)
  adminTbl
    .findByIdAndDelete(id)
    .then((delData) => {
      console.log("Data deleted successfully...", delData);
      fs.unlinkSync(delData.image); 
      return res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      return res.render("404");
    });
}

const editdata = (req,res)=>{
     const id = req.query.id;
  adminTbl
    .findById(id)
    .then((singleData) => {
      console.log(singleData);

      return res.render("editPage", { singleData });
    })
    .catch((err) => {
      console.log(err);
      return res.render("404");
    });
}


const index = (req, res) => {
  adminTbl
    .find({})
    .then((allData) => {
      return res.render("add", {
        record: allData,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.render("404");
    });
};

const adddata = (req, res) => {
  let editedId = req.query.id;
  // console.log(editedId)

  const { name, email, phone, gender, hobby, password, city } = req.body;

  if (editedId) {
    // console.log(req.file);
    if (req.file){
      adminTbl.findById(editedId).then((oldImage) => {
        fs.unlinkSync(oldImage.image);
        let image = req.file.path; 

          adminTbl.findByIdAndUpdate(editedId, {
              name: name,
              email: email,
              phone: phone,
              gender: gender,
              hobby: hobby,
              password: password,
              city: city,
              image: image,
            })
            .then((success) => {
              console.log("Record edited successfully...");
              return res.redirect("/");
            })
            .catch((err) => {
              console.log(err);
              return false;
            });
        }).catch((err)=>{
            console.log(err);
            return false;
        })
        
    } else {
      // console.log("old image");
      adminTbl.findByIdAndUpdate(editedId, {
              name: name,
              email: email,
              phone: phone,
              gender: gender,
              hobby: hobby,
              password: password,
              city: city,
            }).then((success)=>{
              console.log("Data updated successfully...");
              return res.redirect('/');
            }).catch((err)=>{
              console.log(err)
              return res.render('404')
            })
    }
  } else {
    // console.log(req.file)

    let image = "";
    if (req.file) {
      image = req.file.path;
    }

    adminTbl.create({
      name: name,
      email: email,
      phone: phone,
      gender: gender,
      hobby: hobby,
      password: password,
      city: city,
      image: image,
    });
    return res.redirect("/");
  }
};

module.exports = {
  index,
  adddata,
  editdata,
  deletedata
};
