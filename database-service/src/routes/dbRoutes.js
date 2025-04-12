const express = require('express');
const router = express.Router();
const { createUser, getUserById, getUserByUsername } = require('../controllers/dbController');

router.post('/', createUser);
router.get('/:id', getUserById);
router.get('/username/:username', getUserByUsername);

module.exports = router;