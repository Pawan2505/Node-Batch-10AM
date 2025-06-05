const express = require('express');
const db = require('./config/db');
const adminTbl = require('./models/adminTbl')

const port = 8000;

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded());

app.post('/updateData',(req,res)=>{
    let id = req.body.editedId;

    adminTbl.findByIdAndUpdate(id,{
        name: req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        gender:req.body.gender,
        hobby:req.body.bobby,
        password:req.body.password,
        city:req.body.city
    }).then((success)=>{
        console.log("record successfully Edited!!");
        return res.redirect('/');
    }).catch((err)=>{
        console.log(err);
        return false;
    })
})

app.get('/editData', (req,res)=>{
    // console.log(req.query.id);

    let id = req.query.id;

    adminTbl.findById(id).then((singleData)=>{
        // console.log(singleData);
        return res.render('editPage',{singleData})
    }).catch((err)=>{
        console.log(err);
        return false;
    })

})

app.get('/deleteData',(req,res)=>{
    let id = req.query.id;

    adminTbl.findByIdAndDelete(id).then((data)=>{
        return res.redirect('/');
    }).catch((err)=>{
        console.log(err);
        return false;
    })
})

app.post('/insertData', (req,res)=>{
    const {name, email,phone,gender,hobby,password,city} = req.body;

    adminTbl.create({
        name:name,
        email:email,
        phone:phone,
        gender:gender,
        hobby:hobby,
        password:password,
        city:city
    })
    return res.redirect('/');
})

app.get('/',(req,res)=>{
adminTbl.find({}).then((allData)=>{
 return res.render('home',{
        record: allData
    });
}).catch((err)=>{
    console.log(err);
    return false;
})

   
})

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("server start at port :- ",port);
})