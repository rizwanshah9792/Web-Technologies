<?php
include 'db_connection.php';

$sql = "CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($connect->query($sql) === TRUE) {
    $message = "Users table created successfully";
    error_log(date('[Y-m-d H:i:s] ') . $message . PHP_EOL, 3, LOG_FILE);
    echo $message;
} else {
    $error = "Error creating table: " . $connect->error;
    error_log(date('[Y-m-d H:i:s] ') . $error . PHP_EOL, 3, LOG_FILE);
    echo $error;
}

$connect->close();
?>