<?php
header('Content-Type: application/json');
require_once '../../config/db.php'; // Adjust path if needed

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['email'], $data['reg_no'])) {
    echo json_encode(['status' => 'error', 'message' => 'Email and registration number required.']);
    exit;
}

$email = $data['email'];
$reg_no = $data['reg_no'];

$stmt = $pdo->prepare("SELECT student_id FROM students WHERE email = ? AND reg_no = ?");
$stmt->execute([$email, $reg_no]);
$student = $stmt->fetch(PDO::FETCH_ASSOC);

if ($student) {
    echo json_encode(['status' => 'success', 'student_id' => $student['student_id']]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid credentials.']);
}
?>
