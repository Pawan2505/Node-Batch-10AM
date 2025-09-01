const express = require('express');
const db = require('./config/db');
const port = 8000;
var cookieParser = require('cookie-parser')
const app = express();
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use('/', require('./routes/index'));


app.listen(port, (err) => {
    if(err){
        console.error(`Error occurred: ${err.message}`);
    }else{

        console.log(`Server is running on http://localhost:${port}`);
    }
});
