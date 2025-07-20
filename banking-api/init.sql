-- Remove use of plugin
CREATE USER 'your_user'@'%' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'your_user'@'%';
FLUSH PRIVILEGES;
