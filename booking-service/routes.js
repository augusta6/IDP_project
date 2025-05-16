const express = require('express');
const {
  handleCreateBooking,
  handleGetBookings,
  handleGetAvailableRooms
} = require('./controller');

const verifyToken = require('./middleware/verifyToken');
const router = express.Router();


router.post('/bookings', verifyToken, handleCreateBooking);
router.get('/bookings', verifyToken, handleGetBookings);
router.get('/rooms/available', handleGetAvailableRooms);

module.exports = router;

