const User = require('../models/dbModel');

const createUser = (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ error: 'All fields (username, password, email) are required.' });
  }

  User.insert(username, password, email, (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        if (err.sqlMessage.includes('username')) {
          return res.status(409).json({ error: 'Username already exists.' });
        }
        if (err.sqlMessage.includes('email')) {
          return res.status(409).json({ error: 'Email already exists.' });
        }
        return res.status(409).json({ error: 'Duplicate entry.' });
      }

      console.error('DB error:', err);
      return res.status(500).json({ error: 'Database error.' });
    }

    res.status(201).json({ message: 'User created successfully', id: result.insertId });
  });
};

const getUserById = (req, res) => {
  const { id } = req.params;
  User.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.status(200).json(result[0]);
  });
};

const getUserByUsername = (req, res) => {
  const { username } = req.params;
  User.getByUsername(username, (err, result) => {
    if (err || result.length === 0) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(result[0]);
  });
};

module.exports = { createUser, getUserById, getUserByUsername };