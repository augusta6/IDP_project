const pool = require('./db');

const getUserByEmail = async (req, res) => {
  const { email } = req.query;
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return res.json({ user: null });
    res.json({ user: rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};

const createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
    res.status(201).json({ user: { id: result.insertId, email } });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};

module.exports = { getUserByEmail, createUser };