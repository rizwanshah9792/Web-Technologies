<?php
header('Content-Type: application/json');
require_once '../../config/db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['student_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Student ID required']);
    exit;
}

$student_id = $data['student_id'];
$stmt = $pdo->prepare("SELECT * FROM students WHERE student_id = ?");
$stmt->execute([$student_id]);
$student = $stmt->fetch(PDO::FETCH_ASSOC);

if ($student) {
    echo json_encode(['status' => 'success', 'student' => $student]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Student not found']);
}
?>
