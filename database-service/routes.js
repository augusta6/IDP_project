const express = require('express');
const {
  getUserByEmail,
  createUser,
  createBooking,
  getBookings,
  getAvailableRooms,
  createRoom
} = require('./controller');

const router = express.Router();

// USERS
router.get('/users', getUserByEmail);
router.post('/users', createUser);

// BOOKINGS
router.post('/bookings', createBooking);
router.get('/bookings', getBookings);

// ROOMS
router.get('/rooms/available', getAvailableRooms);
router.post('/rooms', createRoom);

module.exports = router;