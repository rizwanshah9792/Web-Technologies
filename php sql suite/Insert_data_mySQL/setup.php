<?php
include 'db_connection.php';

$sql = "CREATE TABLE IF NOT EXISTS student_details (
    id INT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    department VARCHAR(50) NOT NULL
)";

if ($connect->query($sql) === TRUE) {
    echo "Table created successfully";
} else {
    echo "Error creating table: " . $connect->error;
}

$connect->close();
?>