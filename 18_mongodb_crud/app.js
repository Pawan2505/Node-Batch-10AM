const express = require('express');
const db = require('./config/database');
const adminTbl = require('./models/adminTbl');

const port = 8000;

const app = express();
app.set('view engine','ejs');

app.use(express.urlencoded());

app.post('/insertData',(req,res)=>{

    const {name,email,phone,password,gender,hobby,city} = req.body;

    adminTbl.create({
        name:name,
        email:email,
        phone:phone,
        password:password,
        gender:gender,
        hobby:hobby,
        city:city
    })

    return res.redirect('/');
})


app.get('/',(req,res)=>{
    adminTbl.find({}).then((allData)=>{

            // console.log(allData);

    return res.render('home',{record: allData});

    }).catch((err)=>{
        console.log(err);
        return false;
    })
   
})


app.get('/deleteData/:id',(req,res)=>{
    // let id = req.query.id;
    let id = req.params.id;

    adminTbl.findByIdAndDelete(id).then((data)=>{
        return res.redirect('/');
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

    console.log("Server started at port :- ",port);
})