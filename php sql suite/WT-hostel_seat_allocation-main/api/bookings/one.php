<?php
header('Content-Type: application/json');
require_once '../../config/db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['student_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Student ID required']);
    exit;
}

$student_id = $data['student_id'];

// Only get bookings for this student
$stmt = $pdo->prepare("SELECT b.*, r.room_number, r.room_type, r.capacity, h.name as hostel_name
    FROM bookings b
    JOIN rooms r ON b.room_id = r.room_id
    JOIN hostels h ON r.hostel_id = h.hostel_id
    WHERE b.student_id = ?
    ORDER BY b.check_in DESC");
$stmt->execute([$student_id]);
$bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['status' => 'success', 'bookings' => $bookings]);
?>
