const express = require('express');
const router = express.Router();
const Faculty = require("../models/faculty.model");

const { getAllFaculties, addFaculty, updateFaculty, deleteFaculty } = require('../controllers/faculty.controller');

// Routes
router.get("/allfaculties", getAllFaculties);
router.post("/addfaculty", Faculty.uploadImage, addFaculty);
router.put("/updatefaculty/:id", Faculty.uploadImage, updateFaculty);
router.delete("/deletefaculty/:id", deleteFaculty);

module.exports = router;





// const express = require('express');
// const router = express.Router();
// const Faculty = require("../models/faculty.model");
// const  authUser = require('../config/authUser');
// const { getAllFaculties, addFaculty, updateFaculty, deleteFaculty } = require('../controllers/faculty.controller');

// // Routes
// router.get("/allfaculties",authUser, getAllFaculties);
// router.post("/addfaculty",authUser, Faculty.uploadImage, addFaculty);
// router.put("/updatefaculty/:id",authUser, Faculty.uploadImage, updateFaculty);
// router.delete("/deletefaculty/:id",authUser, deleteFaculty);

// module.exports = router;
