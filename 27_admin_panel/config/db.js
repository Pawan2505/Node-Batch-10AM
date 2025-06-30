const mongoose = require('mongoose');

mongoose.connect('')

const db = mongoose.connection;


db.once('open', (err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("db connected successfully...");
})