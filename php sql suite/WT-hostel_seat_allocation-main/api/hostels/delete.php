<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once '../../config/db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['hostel_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Hostel ID required.']);
    exit;
}
$stmt = $pdo->prepare("DELETE FROM hostels WHERE hostel_id = ?");
if ($stmt->execute([$data['hostel_id']])) {
    echo json_encode(['status' => 'success', 'message' => 'Hostel deleted successfully.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to delete hostel.']);
}
?>
