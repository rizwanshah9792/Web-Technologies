<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once '../../config/db.php';

// No advanced filters, just list all bookings
$stmt = $pdo->query("SELECT b.booking_id, b.student_id, b.room_id, b.booking_date, b.check_in, b.check_out, b.status,
                            s.first_name, s.last_name, s.email,
                            r.room_number, r.room_type
                     FROM bookings b
                     JOIN students s ON b.student_id = s.student_id
                     JOIN rooms r ON b.room_id = r.room_id
                     ORDER BY b.booking_date DESC");
$bookings = $stmt->fetchAll();

echo json_encode(['status' => 'success', 'bookings' => $bookings]);


?>
