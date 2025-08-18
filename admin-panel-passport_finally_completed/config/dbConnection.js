const mongoose = require('mongoose');


const db = () => {
    mongoose.connect("mongodb://localhost:27017/adminPanel")
    .then(() => console.log('DB Connected!!'))
    .catch((err) => console.log(err));
}

module.exports = db();