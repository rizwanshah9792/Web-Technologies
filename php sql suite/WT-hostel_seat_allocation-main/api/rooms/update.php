<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once '../../config/db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['room_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Room ID required.']);
    exit;
}

$fields = [];
$params = [];
if (isset($data['room_number'])) { $fields[] = "room_number = ?"; $params[] = $data['room_number']; }
if (isset($data['room_type']))   { $fields[] = "room_type = ?";   $params[] = $data['room_type']; }
if (isset($data['capacity']))    { $fields[] = "capacity = ?";    $params[] = $data['capacity']; }
if (isset($data['available_seats'])) { $fields[] = "available_seats = ?"; $params[] = $data['available_seats']; }
if (isset($data['price']))       { $fields[] = "price = ?";       $params[] = $data['price']; }

if (empty($fields)) {
    echo json_encode(['status' => 'error', 'message' => 'No fields to update.']);
    exit;
}

$params[] = $data['room_id'];
$sql = "UPDATE rooms SET " . implode(', ', $fields) . " WHERE room_id = ?";
$stmt = $pdo->prepare($sql);

if ($stmt->execute($params)) {
    echo json_encode(['status' => 'success', 'message' => 'Room updated successfully.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to update room.']);
}
?>
