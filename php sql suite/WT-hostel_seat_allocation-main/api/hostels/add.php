<?php
header('Content-Type: application/json');

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once '../../config/db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['name'])) {
    echo json_encode(['status' => 'error', 'message' => 'Hostel name required.']);
    exit;
}
$stmt = $pdo->prepare("INSERT INTO hostels (name, address, contact_number) VALUES (?, ?, ?)");
if ($stmt->execute([
    $data['name'],
    $data['address'] ?? '',
    $data['contact_number'] ?? ''
])) {
    echo json_encode(['status' => 'success', 'message' => 'Hostel added successfully.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to add hostel.']);
}
?>
