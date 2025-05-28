<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once '../../config/db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['booking_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Booking ID required.']);
    exit;
}

// Get room_id for the booking
$stmt = $pdo->prepare("SELECT room_id FROM bookings WHERE booking_id = ?");
$stmt->execute([$data['booking_id']]);
$booking = $stmt->fetch();

if (!$booking) {
    echo json_encode(['status' => 'error', 'message' => 'Booking not found.']);
    exit;
}

$room_id = $booking['room_id'];

try {
    $pdo->beginTransaction();
    // Update booking status
    $stmt = $pdo->prepare("UPDATE bookings SET status = 'cancelled' WHERE booking_id = ?");
    $stmt->execute([$data['booking_id']]);
    // Increment available seats
    $stmt = $pdo->prepare("UPDATE rooms SET available_seats = available_seats + 1 WHERE room_id = ?");
    $stmt->execute([$room_id]);
    $pdo->commit();
    echo json_encode(['status' => 'success', 'message' => 'Booking cancelled successfully.']);
} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode(['status' => 'error', 'message' => 'Failed to cancel booking.']);
}
?>
