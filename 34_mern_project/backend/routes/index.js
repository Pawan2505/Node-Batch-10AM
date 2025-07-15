const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminController');

router.post('/', controller.createAdmin);
router.get('/', controller.getAdmins);
router.get('/:id', controller.getAdminById);
router.put('/:id', controller.updateAdmin);
router.delete('/:id', controller.deleteAdmin);

module.exports = router;
