const express = require('express');

const port = 8000;

const app = express();


app.use('/', require('./routes/index'));


app.listen(port, (err) => {
    if(err){
        console.error(`Error occurred: ${err.message}`);
    }else{

        console.log(`Server is running on http://localhost:${port}`);
    }
});
