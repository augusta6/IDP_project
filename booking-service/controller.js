const {
  createBooking,
  getBookings,
  getAvailableRooms
} = require('./services/dbService');

const handleCreateBooking = async (req, res) => {
  try {
    const data = await createBooking(req.body);
    res.status(201).json(data);
  } catch (err) {
    console.error("Booking create error:", err.message);
    res.status(500).json({ error: 'Could not create booking' });
  }
};

const handleGetBookings = async (req, res) => {
  try {
    const data = await getBookings(req.query.user_id);
    res.json(data);
  } catch (err) {
    console.error("Booking fetch error:", err.message);
    res.status(500).json({ error: 'Could not fetch bookings' });
  }
};

const handleGetAvailableRooms = async (req, res) => {
  const { datetime, players } = req.query;
  try {
    const data = await getAvailableRooms(datetime, players);
    res.json(data);
  } catch (err) {
    console.error("Availability error:", err.message);
    res.status(500).json({ error: 'Could not check availability' });
  }
};

module.exports = {
  handleCreateBooking,
  handleGetBookings,
  handleGetAvailableRooms
};