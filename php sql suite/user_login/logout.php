<?php
session_start();
require_once 'config.php';

// Log logout event
if (isset($_SESSION['user_name'])) {
    error_log(date('[Y-m-d H:i:s] ') . "User logged out: " . $_SESSION['user_name'] . PHP_EOL, 3, LOG_FILE);
}

// Destroy session
session_unset();
session_destroy();

$_SESSION['message'] = "You have been logged out successfully.";
header("Location: login.php");
exit;
?>