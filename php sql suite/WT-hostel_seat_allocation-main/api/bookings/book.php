<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once '../../config/db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (
    !isset($data['student_id']) ||
    !isset($data['room_id']) ||
    !isset($data['check_in']) ||
    !isset($data['check_out'])
) {
    echo json_encode(['status' => 'error', 'message' => 'Missing booking details.']);
    exit;
}

// Check room availability
$stmt = $pdo->prepare("SELECT available_seats FROM rooms WHERE room_id = ?");
$stmt->execute([$data['room_id']]);
$room = $stmt->fetch();

if (!$room || $room['available_seats'] < 1) {
    echo json_encode(['status' => 'error', 'message' => 'No available seats in this room.']);
    exit;
}

// Create booking
try {
    $pdo->beginTransaction();

 $stmt = $pdo->prepare("INSERT INTO bookings (student_id, room_id, booking_date, check_in, check_out, status) VALUES (?, ?, NOW(), ?, ?, 'confirmed')");
$stmt->execute([
    $data['student_id'],
    $data['room_id'],
    $data['check_in'],
    $data['check_out']
]);

    $stmt = $pdo->prepare("UPDATE rooms SET available_seats = available_seats - 1 WHERE room_id = ?");
    $stmt->execute([$data['room_id']]);

    $pdo->commit();
    echo json_encode(['status' => 'success', 'message' => 'Booking successful.']);
} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode(['status' => 'error', 'message' => 'Booking failed.', 'error' => $e->getMessage()]);
}
?>
