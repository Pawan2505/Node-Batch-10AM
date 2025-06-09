const express = require('express');

const port = 8000;
const app = express();

app.set('view engine', 'ejs');

// Use your routes
app.use('/', require('./routes'));

app.listen(port, (err) => {
    if (err) {
        console.log("Error starting server:", err);
        return;
    }
    console.log("Server started on port -", port);
});
