<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once '../../config/db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['username'], $data['password'])) {
    echo json_encode(['status' => 'error', 'message' => 'Missing credentials.']);
    exit;
}

// Fetch admin by username and password (plain text)
$stmt = $pdo->prepare("SELECT * FROM admins WHERE username = ? AND password_hash = ?");
$stmt->execute([$data['username'], $data['password']]);
$admin = $stmt->fetch();

if ($admin) {
    // Success: return admin_id and role
    echo json_encode([
        'status' => 'success',
        'message' => 'Login successful.',
        'admin_id' => $admin['admin_id'],
        'role' => $admin['role']
    ]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid username or password.']);
}
?>
