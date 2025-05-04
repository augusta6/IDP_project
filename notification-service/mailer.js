const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false, // false pentru TLS (port 587), true doar dacă folosești 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const sendMail = async ({ to, subject, text }) => {
  const mailOptions = {
    from: `"EscapeRoom App" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("📨 Email trimis:", info.messageId);
  } catch (error) {
    console.error("❌ Eroare trimitere email:", error.message);
    throw error;
  }
};

module.exports = { sendMail };
