<?php
require_once 'config.php';

$connect = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
if ($connect->connect_error) {
    die("Connection Failed: " . $connect->connect_error);
}
?>