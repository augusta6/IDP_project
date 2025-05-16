const express = require('express');
const {
  handleCreateBooking,
  handleGetBookings,
  handleGetAvailableRooms
} = require('./controller');

const requireAuth = require('./middleware/requireAuth');
const router = express.Router();


router.post('/bookings', requireAuth, handleCreateBooking);
router.get('/bookings', requireAuth, handleGetBookings);
router.get('/rooms/available', handleGetAvailableRooms);

module.exports = router;

