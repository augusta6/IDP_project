const bcrypt = require('bcrypt');
const { generateToken } = require('./utils/jwt');
const { createUser, findUserByEmail } = require('./services/dbService');



const registerUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Register payload:", req.body);

  try {
    const existing = await findUserByEmail(email);
    console.log("Existing:", existing);

    if (existing) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({ email, password: hashedPassword });
    console.log("Created user:", user);

    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    console.error("Registration error:", err.message || err);
    res.status(500).json({ error: 'Registration failed' });
  }
};
  
const loginUser = async (req, res) => {
  console.log("LLOGIN FOLOSIT");
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = generateToken({ id: user.id, email: user.email });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

const logoutUser = (req, res) => {
  res.json({ message: 'Logout successful. Please delete your token on the client.' });
};



module.exports = { registerUser, loginUser, logoutUser };