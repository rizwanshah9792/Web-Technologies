<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once '../../config/db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['room_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Room ID required.']);
    exit;
}

$stmt = $pdo->prepare("DELETE FROM rooms WHERE room_id = ?");
if ($stmt->execute([$data['room_id']])) {
    echo json_encode(['status' => 'success', 'message' => 'Room deleted successfully.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to delete room.']);
}
?>
