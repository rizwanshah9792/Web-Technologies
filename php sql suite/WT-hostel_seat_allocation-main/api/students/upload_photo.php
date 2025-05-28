<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once '../../config/db.php';

// Check if a file and student_id are provided
if (!isset($_POST['student_id']) || !isset($_FILES['photo'])) {
    echo json_encode(['status' => 'error', 'message' => 'Student ID and photo file are required.']);
    exit;
}

$student_id = $_POST['student_id'];
$photo = $_FILES['photo'];

// Validate file upload
$allowed_types = ['image/jpeg', 'image/png', 'image/gif'];
if (!in_array($photo['type'], $allowed_types)) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid file type. Only JPG, PNG, GIF allowed.']);
    exit;
}

// Define upload directory
$upload_dir = '../../uploads/student_photos/';
if (!is_dir($upload_dir)) {
    mkdir($upload_dir, 0755, true);
}

// Generate unique file name
$ext = pathinfo($photo['name'], PATHINFO_EXTENSION);
$filename = 'student_' . $student_id . '_' . time() . '.' . $ext;
$target_path = $upload_dir . $filename;

// Move uploaded file
if (move_uploaded_file($photo['tmp_name'], $target_path)) {
    // Update student record with photo path
    $stmt = $pdo->prepare("UPDATE students SET photo = ? WHERE student_id = ?");
    if ($stmt->execute(['uploads/student_photos/' . $filename, $student_id])) {
        echo json_encode(['status' => 'success', 'message' => 'Photo uploaded successfully.', 'photo_path' => 'uploads/student_photos/' . $filename]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to update student photo in database.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to move uploaded file.']);
}
?>
