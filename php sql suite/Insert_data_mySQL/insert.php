<?php
session_start();
include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $id = $_POST['id'];
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $department = $_POST['department'];

    // Input validation
    if (empty($id) || !is_numeric($id)) {
        $_SESSION['message'] = "Error: ID must be a valid number.";
        header("Location: index.php");
        exit;
    }
    if (empty($first_name) || empty($last_name) || empty($department)) {
        $_SESSION['message'] = "Error: All fields are required.";
        header("Location: index.php");
        exit;
    }
    if (strlen($first_name) > 50 || strlen($last_name) > 50 || strlen($department) > 50) {
        $_SESSION['message'] = "Error: Input fields must not exceed 50 characters.";
        header("Location: index.php");
        exit;
    }

    // Check for duplicate ID
    $check = $connect->prepare("SELECT id FROM student_details WHERE id = ?");
    $check->bind_param("i", $id);
    $check->execute();
    if ($check->get_result()->num_rows > 0) {
        $_SESSION['message'] = "Error: ID already exists.";
        $check->close();
        $connect->close();
        header("Location: index.php");
        exit;
    }
    $check->close();

    // Insert data using prepared statement
    $statement = $connect->prepare("INSERT INTO student_details(id, first_name, last_name, department) VALUES(?, ?, ?, ?)");
    $statement->bind_param("isss", $id, $first_name, $last_name, $department);
    
    if ($statement->execute()) {
        $_SESSION['message'] = "Data Inserted Successfully";
    } else {
        $_SESSION['message'] = "Error: " . $statement->error;
    }
    
    $statement->close();
    $connect->close();
    
    header("Location: index.php");
    exit;
} else {
    $_SESSION['message'] = "Error: Invalid request method.";
    header("Location: index.php");
    exit;
}
?>