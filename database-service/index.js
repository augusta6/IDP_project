const express = require('express');
require('dotenv').config();
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`Database service running on port ${PORT}`));