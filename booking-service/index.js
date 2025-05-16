const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(cookieParser());

// ⚠️ trebuie să fie identic cu auth-service!
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecretkey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 2 * 60 * 60 * 1000
  }
}));
app.use('/api', routes);

console.log("DB_SERVICE_URL:", process.env.DB_SERVICE_URL);
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Booking service running on port ${PORT}`));