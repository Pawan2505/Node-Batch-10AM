const express = require('express');
const database = require('./config/db');
const adminTbl = require('./models/adminTbl')

const port = 8001;

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded());

app.post('/insertData',(req,res)=>{
  // console.log(req.body);

  const {name,email,password,phone,city} = req.body;
  adminTbl.create({
    name:name,
    email:email,
    password:password,
    phone:phone,
    city:city
  }).then((data)=>{
    console.log("Record successfully inserted...",data);
  }).catch((err)=>{
    console.log(err)
  })
  return res.redirect('/')
})

app.get('/',(req,res)=>{
  return res.render('home');
})

app.listen(port, (err)=>{
  if(err){
    console.log("Server is not start...");
    return false;
  }

  console.log("Server is started at port :- ", port);
})