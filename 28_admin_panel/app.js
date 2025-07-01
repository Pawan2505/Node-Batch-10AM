const express = require('express');
const db = require('./config/db')
const path = require('path')

const port = 8001;

const app = express();
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'assets')));
app.use(express.urlencoded({extended:true}));
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use('/', require('./routes/index'))

app.listen(port, (err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("server started on port : ",port);
})