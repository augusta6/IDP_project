const axios = require('axios');

// 🔍 Preluăm URL-ul și ne asigurăm că nu are spații în plus
const DB_URL = process.env.DB_SERVICE_URL?.trim();

console.log('🔧 Loaded DB_SERVICE_URL:', DB_URL); // debug inițial

const findUserByEmail = async (email) => {
  try {
    const fullUrl = `${DB_URL}?email=${email}`;
    console.log("📡 Calling:", fullUrl); // ✅ corect
    const res = await axios.get(fullUrl);
    return res.data.user;
  } catch (err) {
    console.error("❌ findUserByEmail error:", err.message);
    return null;
  }
};

const createUser = async ({ email, password }) => {
  try {
    console.log('📡 Posting to:', DB_URL, 'with payload:', { email, password }); // debug
    const res = await axios.post(DB_URL, { email, password });
    return res.data.user;
  } catch (err) {
    console.error('❌ createUser error:', err.message);
    throw err;
  }
};

module.exports = { findUserByEmail, createUser };