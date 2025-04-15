const axios = require('axios');
require('dotenv').config();

const BASE_URL = process.env.DB_SERVICE_URL;

// Creează o rezervare
const createBooking = async ({ user_id, room_id, booking_time }) => {
  const res = await axios.post(`${BASE_URL}/bookings`, { user_id, room_id, booking_time });
  return res.data;
};

// Obține rezervările
const getBookings = async (user_id) => {
  const url = user_id ? `${BASE_URL}/bookings?user_id=${user_id}` : `${BASE_URL}/bookings`;
  const res = await axios.get(url);
  return res.data;
};

// Camere disponibile
const getAvailableRooms = async (datetime, players) => {
  const res = await axios.get(`${BASE_URL}/rooms/available`, {
    params: { datetime, players }
  });
  return res.data;
};

module.exports = {
  createBooking,
  getBookings,
  getAvailableRooms
};