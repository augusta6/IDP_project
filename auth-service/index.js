const express = require('express');

require('dotenv').config();
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use('/api/auth', routes);

console.log("DB_SERVICE_URL:", process.env.DB_SERVICE_URL);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('Auth service running on port ${PORT}'));