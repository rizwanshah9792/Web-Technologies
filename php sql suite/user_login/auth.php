<?php
session_start();

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    $_SESSION['message'] = "Error: You must be logged in to access this page.";
    header("Location: login.php");
    exit;
}
?>