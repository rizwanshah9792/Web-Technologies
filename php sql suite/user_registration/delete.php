<?php
session_start();
include 'db_connection.php';
require_once 'config.php';

if (isset($_GET['id'])) {
    $id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
    if ($id === false || $id <= 0) {
        $_SESSION['message'] = "Error: Invalid user ID.";
        error_log(date('[Y-m-d H:i:s] ') . $_SESSION['message'] . PHP_EOL, 3, LOG_FILE);
        header("Location: dashboard.php");
        exit;
    }

    // Delete user
    $stmt = $connect->prepare("DELETE FROM users WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        $_SESSION['message'] = "User deleted successfully.";
        error_log(date('[Y-m-d H:i:s] ') . "User deleted: ID $id" . PHP_EOL, 3, LOG_FILE);
    } else {
        $_SESSION['message'] = "Error: Deletion failed - " . $stmt->error;
        error_log(date('[Y-m-d H:i:s] ') . $_SESSION['message'] . PHP_EOL, 3, LOG_FILE);
    }

    $stmt->close();
    $connect->close();
} else {
    $_SESSION['message'] = "Error: No user ID provided.";
    error_log(date('[Y-m-d H:i:s] ') . $_SESSION['message'] . PHP_EOL, 3, LOG_FILE);
}

header("Location: dashboard.php");
exit;
?>