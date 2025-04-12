const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const response = await axios.post('http://io-service:3003/api/users', {
      username,
      password: hashedPassword,
      role,
    });
    res.status(201).json({ message: 'User registered', id: response.data.id });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const response = await axios.get(`http://io-service:3003/api/users/username/${username}`);
    const user = response.data;
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(401).json({ message: 'Invalid credentials or user not found' });
  }
};

module.exports = { register, login };