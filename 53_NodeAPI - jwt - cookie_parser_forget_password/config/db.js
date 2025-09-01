const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydatabase')

const db = mongoose.connection;

db.once('open', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
  }
});