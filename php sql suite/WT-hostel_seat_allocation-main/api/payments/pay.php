<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once '../../config/db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['booking_id'], $data['amount'], $data['payment_mode'])) {
    echo json_encode(['status' => 'error', 'message' => 'Missing required fields.']);
    exit;
}

// Insert payment
$stmt = $pdo->prepare("INSERT INTO payments (booking_id, amount, payment_date, payment_mode, status) VALUES (?, ?, CURDATE(), ?, 'completed')");
if ($stmt->execute([
    $data['booking_id'],
    $data['amount'],
    $data['payment_mode']
])) {
    // Optionally update booking status to 'paid'
    $pdo->prepare("UPDATE bookings SET status = 'paid' WHERE booking_id = ?")->execute([$data['booking_id']]);
    echo json_encode(['status' => 'success', 'message' => 'Payment successful.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Payment failed.']);
}
?>
