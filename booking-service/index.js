const express = require('express');

require('dotenv').config();
const routes = require('./routes');

const app = express();
app.use(express.json());

app.use('/api', routes);

console.log("DB_SERVICE_URL:", process.env.DB_SERVICE_URL);
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Booking service running on port ${PORT}`));