<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once '../../config/db.php';

// Get input data
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['student_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Student ID is required.']);
    exit;
}

$student_id = $data['student_id'];

// Prepare and execute delete statement
$stmt = $pdo->prepare("DELETE FROM students WHERE student_id = ?");
if ($stmt->execute([$student_id])) {
    echo json_encode(['status' => 'success', 'message' => 'Student deleted successfully.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to delete student.']);
}
?>
