const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(cookieParser());

// 🔐 Setup sesiune
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecretkey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax', // sau 'none' dacă ai HTTPS
    maxAge: 2 * 60 * 60 * 1000 // 2h
  }
}));

app.use('/api/auth', routes);

console.log("DB_SERVICE_URL:", process.env.DB_SERVICE_URL);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('Auth service running on port ${PORT}'));