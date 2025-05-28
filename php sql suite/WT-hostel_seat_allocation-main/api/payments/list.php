<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once '../../config/db.php';

try {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['student_id'])) {
        // List payments for a student
        $stmt = $pdo->prepare(
            "SELECT p.*, b.student_id, r.room_number
             FROM payments p
             JOIN bookings b ON p.booking_id = b.booking_id
             JOIN rooms r ON b.room_id = r.room_id
             WHERE b.student_id = ?
             ORDER BY p.payment_date DESC"
        );
        $stmt->execute([$data['student_id']]);
    } else {
        // List all payments (admin)
        $stmt = $pdo->query(
            "SELECT p.*, b.student_id, r.room_number
             FROM payments p
             JOIN bookings b ON p.booking_id = b.booking_id
             JOIN rooms r ON b.room_id = r.room_id
             ORDER BY p.payment_date DESC"
        );
    }

    $payments = $stmt->fetchAll();

    echo json_encode([
        'status' => 'success',
        'payments' => $payments
    ]);
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to fetch payments.',
        'error' => $e->getMessage()
    ]);
}
?>
