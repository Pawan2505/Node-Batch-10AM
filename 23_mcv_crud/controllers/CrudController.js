
const adminTbl = require('../models/adminTbl')

const index = (req, res)=>{
    return res.render('add')
}


const adddata = (req,res)=>{
   const {name, email,phone, password, gender, hobby, city} = req.body;

    let image = "";

   if(req.file){
    image = req.file.path;
   }

   adminTbl.create({
    name:name,
    email:email,
    phone:phone,
    gender:gender,
    hobby:hobby,
    password:password,
    city:city,
    image:image
   }).then((data)=>{
    console.log("Record inserted successfully...")
    return res.redirect('/')
   }).catch((err)=>{
    console.log(err);
    return false;
   })
}

module.exports = {
    index,
    adddata
};