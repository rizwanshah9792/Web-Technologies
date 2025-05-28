<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once '../../config/db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['username'], $data['password'], $data['email'])) {
    echo json_encode(['status' => 'error', 'message' => 'Missing required fields.']);
    exit;
}

// For plain password (as you requested earlier)
$stmt = $pdo->prepare("INSERT INTO admins (username, password_hash, email, role) VALUES (?, ?, ?, 'admin')");
if ($stmt->execute([$data['username'], $data['password'], $data['email']])) {
    echo json_encode(['status' => 'success', 'message' => 'Admin registered successfully.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Registration failed.']);
}
?>
