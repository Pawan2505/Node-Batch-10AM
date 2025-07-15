const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const adminRoutes = require('./routes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
