CREATE USER 'myusername'@'localhost' IDENTIFIED BY 'mypassword';
GRANT ALL PRIVILEGES ON `MediaSharingApp`.* TO 'myusername'@'localhost';
FLUSH PRIVILEGES;