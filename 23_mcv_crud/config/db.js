const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/mvccrud");

const db = mongoose.connection;


db.once('open',(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("DB connected successfully...");
})