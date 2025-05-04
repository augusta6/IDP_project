CREATE DATABASE IF NOT EXISTS escape_db;
USE escape_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Tabela pentru escape rooms (pot fi mai multe săli)
CREATE TABLE IF NOT EXISTS escape_rooms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  min_players INT NOT NULL,
  max_players INT NOT NULL,
  duration_minutes INT NOT NULL
);

-- Tabela pentru rezervări (Booking Service)
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  room_id INT NOT NULL,
  booking_time DATETIME NOT NULL,
  status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (room_id) REFERENCES escape_rooms(id) ON DELETE CASCADE
);

-- În init.sql din mysql:
ALTER TABLE bookings ADD COLUMN notified BOOLEAN DEFAULT FALSE;
