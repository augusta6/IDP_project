const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/dbRoutes');
// const reservationRoutes = require('./routes/reservationRoutes');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
// app.use('/api/reservations', reservationRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`✅ IO service running on port ${PORT}`);
});