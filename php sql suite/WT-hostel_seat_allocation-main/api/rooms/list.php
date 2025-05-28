<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once '../../config/db.php';

$stmt = $pdo->query("SELECT r.room_id, r.room_number, r.room_type, r.capacity, r.available_seats, r.price, h.name AS hostel_name
                     FROM rooms r
                     JOIN hostels h ON r.hostel_id = h.hostel_id");
$rooms = $stmt->fetchAll();

echo json_encode(['status' => 'success', 'rooms' => $rooms]);
?>
