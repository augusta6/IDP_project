const express = require('express');
const axios = require('axios');
const { sendMail } = require('./mailer');
require('dotenv').config();

const app = express();
app.use(express.json());

const DB_URL = process.env.DB_SERVICE_URL;

app.post('/api/notify', async (req, res) => {
  const { to, subject, text } = req.body;
  if (!to || !subject || !text) return res.status(400).json({ error: 'Missing fields' });

  try {
    await sendMail({ to, subject, text });
    res.json({ message: 'Email trimis' });
  } catch (err) {
    console.error("❌ Email error:", err.message);
    res.status(500).json({ error: 'Eroare trimitere email' });
  }
});

// 🔁 Periodic check
setInterval(async () => {
  console.log("🔍 Căutare rezervări viitoare...");

  try {
    const res = await axios.get(`${DB_URL}/bookings/upcoming`);
    const bookings = res.data;

    for (const booking of bookings) {
      await sendMail({
        to: booking.email,
        subject: "⏰ Reminder rezervare Escape Room",
        text: `Salut! Ai o rezervare la camera "${booking.room_name}" pe ${booking.booking_time}.`
      });

      // ✅ Marcare rezervare ca notificată
      await axios.post(`${DB_URL}/bookings/${booking.id}/notified`);
    }

    console.log(`✅ Trimise ${bookings.length} notificări`);
  } catch (err) {
    console.error("❌ Eroare reminder automat:", err.message);
  }
}, 5 * 60 * 1000); // la fiecare 5 minute

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`📧 Notification service rulează pe port ${PORT}`));
