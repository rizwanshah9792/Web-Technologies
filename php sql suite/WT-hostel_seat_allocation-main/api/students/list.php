<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once '../../config/db.php';

try {
    $stmt = $pdo->query("SELECT student_id, first_name, last_name, email, reg_no, gender, dob, phone, address FROM students");
    $students = $stmt->fetchAll();

    echo json_encode([
        'status' => 'success',
        'students' => $students
    ]);
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to fetch students.',
        'error' => $e->getMessage()
    ]);
}
?>
