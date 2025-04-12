CREATE DATABASE IF NOT EXISTS app_db;
USE app_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  loc VARCHAR(255) NOT NULL,
  data_rez DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS USER_RESERVATIONS (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  reservation_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (reservation_id) REFERENCES reservations(id)
);

INSERT INTO users (username, password, email) VALUES ("Andreea", "andreea", "andreea@gmail.com");

INSERT INTO reservations (title, loc, data_rez) VALUES ("Concert", "Bucuresti", "2025-10-01 18:00:00");
