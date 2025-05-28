<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // For development only

require_once '../../config/db.php';

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Validate required fields
if (
    !isset($data['first_name']) || !isset($data['last_name']) || 
    !isset($data['email']) || !isset($data['reg_no'])
) {
    echo json_encode(['status' => 'error', 'message' => 'Missing required fields.']);
    exit;
}

// Prepare and execute insert statement
try {
    $stmt = $pdo->prepare(
        "INSERT INTO students (first_name, last_name, email, reg_no) VALUES (?, ?, ?, ?)"
    );
    $stmt->execute([
        $data['first_name'],
        $data['last_name'],
        $data['email'],
        $data['reg_no']
    ]);
    echo json_encode(['status' => 'success', 'message' => 'Student registered successfully.']);
} catch (PDOException $e) {
    if ($e->getCode() == 23000) { // Duplicate entry
        echo json_encode(['status' => 'error', 'message' => 'Email or registration number already exists.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Registration failed.', 'error' => $e->getMessage()]);
    }
}
?>
