<?php
require_once 'config.php';

$connect = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
if ($connect->connect_error) {
    $error = "Connection Failed: " . $connect->connect_error;
    error_log(date('[Y-m-d H:i:s] ') . $error . PHP_EOL, 3, LOG_FILE);
    die($error);
}
?>