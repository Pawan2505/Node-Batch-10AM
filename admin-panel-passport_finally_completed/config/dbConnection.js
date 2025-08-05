const mongoose = require('mongoose');


const db = () => {
    mongoose.connect("mongodb+srv://rw3girishgk:Decode%40123@cluster0.c1whb.mongodb.net/admin-panel")
    .then(() => console.log('DB Connected!!'))
    .catch((err) => console.log(err));
}

module.exports = db();