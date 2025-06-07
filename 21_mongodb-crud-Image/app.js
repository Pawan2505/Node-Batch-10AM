const express = require("express");
const db = require("./config/db");
const path = require("path");
const adminTbl = require("./models/adminTbl");

const fs = require("fs");

const port = 8000;

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const multer = require("multer");

// file upload start

const fileupload = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const ImageUpload = multer({ storage: fileupload }).single("image");

// fileupload end

app.get("/editData", (req, res) => {
  // console.log(req.query.id);

  let id = req.query.id;

  adminTbl.findById(id).then((singleData) => {
      // console.log(singleData);
      return res.render("editPage", { singleData });
    }).catch((err) => {
      console.log(err);
      return false;
    });
});



app.get("/deleteData", (req, res) => {
  let id = req.query.id;

  adminTbl.findById(id).then((singleRecord) => {
      fs.unlinkSync(singleRecord.image);
    }).catch((err) => {
      console.log(err);
      return false;
    });

  adminTbl.findByIdAndDelete(id).then((data) => {
      return res.redirect("/");
    }).catch((err) => {
      console.log(err);
      return false;
    });
});

app.post("/insertData", ImageUpload, (req, res) => {
  let editedId = req.body.editedId;
  // console.log(editedId)

  const { name, email, phone, gender, hobby, password, city } = req.body;

  if (editedId) {
    if (req.file) {
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
      console.log("old image");
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
});

app.get("/", (req, res) => {
  adminTbl
    .find({})
    .then((allData) => {
      return res.render("home", {
        record: allData,
      });
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return false;
  }
  console.log("server start at port :- ", port);
});
