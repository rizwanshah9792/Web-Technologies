<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once '../../config/db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['first_name'], $data['last_name'], $data['email'], $data['reg_no'])) {
    echo json_encode(['status' => 'error', 'message' => 'Missing required fields.']);
    exit;
}

$stmt = $pdo->prepare("INSERT INTO students (first_name, last_name, email, reg_no, gender, dob, phone) VALUES (?, ?, ?, ?, ?, ?, ?)");
if ($stmt->execute([
    $data['first_name'],
    $data['last_name'],
    $data['email'],
    $data['reg_no'],
    $data['gender'] ?? null,
    $data['dob'] ?? null,
    $data['phone'] ?? null
])) {
    echo json_encode(['status' => 'success', 'message' => 'Student added successfully.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to add student.']);
}
?>
