const express = require('express');
const router = express.Router();
const { getUserByEmail, createUser } = require('./controller');

router.get('/', getUserByEmail);  // ?email=...
router.post('/', createUser);

module.exports = router;