const express = require('express');

const Faculty = require('../models/faculty.model');
const router = express.Router();

router.get("/allfaculties", Faculty.getAllFaculties);

router.post('/addfaculty', Faculty.uploadImage, Faculty.addFaculty);

router.put('/updatefaculty/:id', Faculty.uploadImage, Faculty.updateFaculty);

router.delete('/deletefaculty/:id', Faculty.deleteFaculty);

module.exports = router;