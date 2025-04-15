const express = require('express');
const {
  handleCreateBooking,
  handleGetBookings,
  handleGetAvailableRooms
} = require('./controller');

const router = express.Router();

router.post('/bookings', handleCreateBooking);
router.get('/bookings', handleGetBookings);
router.get('/rooms/available', handleGetAvailableRooms);

module.exports = router;