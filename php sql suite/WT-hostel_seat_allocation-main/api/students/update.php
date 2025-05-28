<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once '../../config/db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['student_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Student ID required.']);
    exit;
}

$fields = [];
$params = [];
if (isset($data['first_name']))  { $fields[] = "first_name = ?";  $params[] = $data['first_name']; }
if (isset($data['last_name']))   { $fields[] = "last_name = ?";   $params[] = $data['last_name']; }
if (isset($data['gender']))      { $fields[] = "gender = ?";      $params[] = $data['gender']; }
if (isset($data['dob']))         { $fields[] = "dob = ?";         $params[] = $data['dob']; }
if (isset($data['address']))     { $fields[] = "address = ?";     $params[] = $data['address']; }
if (isset($data['phone']))       { $fields[] = "phone = ?";       $params[] = $data['phone']; }

if (empty($fields)) {
    echo json_encode(['status' => 'error', 'message' => 'No fields to update.']);
    exit;
}

$params[] = $data['student_id'];
$sql = "UPDATE students SET " . implode(', ', $fields) . " WHERE student_id = ?";
$stmt = $pdo->prepare($sql);

if ($stmt->execute($params)) {
    echo json_encode(['status' => 'success', 'message' => 'Profile updated successfully.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to update profile.']);
}
?>
