// booking-service/middleware/verifyToken.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  console.log("🔐 Verific token...");

  const authHeader = req.headers['authorization'];

  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1]; // extrage doar tokenul după "Bearer"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // trebuie să fie aceeași cheie ca în auth-service
    req.user = decoded; // atașează datele userului în request
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

module.exports = verifyToken;
