<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once '../../config/db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['hostel_id'], $data['room_number'], $data['room_type'], $data['capacity'], $data['price'])) {
    echo json_encode(['status' => 'error', 'message' => 'Missing required fields.']);
    exit;
}

$stmt = $pdo->prepare("INSERT INTO rooms (hostel_id, room_number, room_type, capacity, available_seats, price) VALUES (?, ?, ?, ?, ?, ?)");
if ($stmt->execute([
    $data['hostel_id'],
    $data['room_number'],
    $data['room_type'],
    $data['capacity'],
    $data['capacity'], // available_seats = capacity at creation
    $data['price']
])) {
    echo json_encode(['status' => 'success', 'message' => 'Room added successfully.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to add room.']);
}
?>
