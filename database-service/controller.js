const pool = require('./db');

const getUserByEmail = async (req, res) => {
  const { email } = req.query;
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return res.json({ user: null });
    res.json({ user: rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};

const createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
    res.status(201).json({ user: { id: result.insertId, email } });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};

const createRoom = async (req, res) => {
  const { name, description, min_players, max_players, duration_minutes } = req.body;

  if (!name || !min_players || !max_players || !duration_minutes) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO escape_rooms (name, description, min_players, max_players, duration_minutes)
       VALUES (?, ?, ?, ?, ?)`,
      [name, description || null, min_players, max_players, duration_minutes]
    );

    res.status(201).json({
      message: 'Room created',
      room_id: result.insertId
    });
  } catch (err) {
    console.error("createRoom error:", err.message);
    res.status(500).json({ error: 'Database error while creating room' });
  }
};

const createBooking = async (req, res) => {
  const { user_id, room_id, booking_time } = req.body;

  if (!user_id || !room_id || !booking_time) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO bookings (user_id, room_id, booking_time)
       VALUES (?, ?, ?)`,
      [user_id, room_id, booking_time]
    );
    res.status(201).json({ message: 'Booking created', booking_id: result.insertId });
  } catch (err) {
    console.error("createBooking error:", err.message);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

const getBookings = async (req, res) => {
  const { user_id } = req.query;
  let query = `SELECT * FROM bookings`;
  const values = [];

  if (user_id) {
    query += `WHERE user_id = ?`;
    values.push(user_id);
  }

  try {
    const [rows] = await pool.query(query, values);
    res.json({ bookings: rows });
  } catch (err) {
    console.error("getBookings error:", err.message);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

const getAvailableRooms = async (req, res) => {
  const { datetime, players } = req.query;

  if (!datetime || !players) {
    return res.status(400).json({ error: 'Missing datetime or players in query' });
  }

  try {
    const [rooms] = await pool.query(
      `SELECT * FROM escape_rooms WHERE min_players <= ? AND max_players >= ?`,
      [players, players]
    );

    const [booked] = await pool.query(
      `
      SELECT r.id AS room_id
      FROM escape_rooms r
      JOIN bookings b ON b.room_id = r.id
      WHERE 
        TIMESTAMP(?) BETWEEN b.booking_time AND DATE_ADD(b.booking_time, INTERVAL r.duration_minutes MINUTE)
      `,
      [datetime]
    );

    const busyRoomIds = booked.map(b => b.room_id);
    const availableRooms = rooms.filter(r => !busyRoomIds.includes(r.id));
    
    res.json({ available_rooms: availableRooms });
  } catch (err) {
    console.error("getAvailableRooms error:", err.message);
    res.status(500).json({ error: 'Failed to get availability' });
  }
};

const getUpcomingBookings = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT b.id, b.booking_time, b.user_id, u.email, r.name AS room_name
       FROM bookings b
       JOIN users u ON b.user_id = u.id
       JOIN escape_rooms r ON b.room_id = r.id
       WHERE b.booking_time > NOW() AND b.notified = FALSE
       ORDER BY b.booking_time ASC`
    );
    res.json(rows);
  } catch (err) {
    console.error("getUpcomingBookings error:", err.message);
    res.status(500).json({ error: 'Database error' });
  }
};

const markBookingAsNotified = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(`UPDATE bookings SET notified = TRUE WHERE id = ?`, [id]);
    res.json({ message: "Marked as notified" });
  } catch (err) {
    console.error("markBookingAsNotified error:", err.message);
    res.status(500).json({ error: 'Database error' });
  }
};

module.exports = { getUserByEmail, createUser, createRoom, createBooking, getBookings, getAvailableRooms, getUpcomingBookings, markBookingAsNotified };