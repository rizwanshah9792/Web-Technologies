<?php
session_start();
require_once 'db_connection.php';
require_once 'config.php';

// Set headers for JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow CORS for multiplatform access
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// Parse request
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['REQUEST_URI'], '/'));
$endpoint = array_shift($request);
$resource = array_shift($request);
$id = !empty($request) ? filter_var($request[0], FILTER_VALIDATE_INT) : null;

// Validate endpoint
if ($endpoint !== 'api' || $resource !== 'students') {
    http_response_code(404);
    echo json_encode(['error' => 'Endpoint not found']);
    exit;
}

// Helper function to send JSON response
function send_response($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}

// Validate input data
function validate_input($data, $required_fields) {
    foreach ($required_fields as $field) {
        if (!isset($data[$field]) || empty(trim($data[$field]))) {
            return "Missing or empty $field";
        }
    }
    return null;
}

// Handle requests
switch ($method) {
    case 'GET':
        if ($id) {
            // Get single student
            $stmt = $connect->prepare("SELECT id, first_name, last_name, department FROM student_details WHERE id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows === 0) {
                send_response(['error' => 'Student not found'], 404);
            }
            $student = $result->fetch_assoc();
            send_response($student);
            $stmt->close();
        } else {
            // Get all students
            $result = $connect->query("SELECT id, first_name, last_name, department FROM student_details");
            $students = [];
            while ($row = $result->fetch_assoc()) {
                $students[] = $row;
            }
            send_response($students);
            $result->free();
        }
        break;

    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        if (!$input) {
            send_response(['error' => 'Invalid JSON'], 400);
        }

        // Validate input
        $error = validate_input($input, ['first_name', 'last_name', 'department']);
        if ($error) {
            send_response(['error' => $error], 400);
        }

        $id = filter_var($input['id'], FILTER_VALIDATE_INT);
        if ($id === false || $id <= 0) {
            send_response(['error' => 'Invalid or missing ID'], 400);
        }
        $first_name = trim($input['first_name']);
        $last_name = trim($input['last_name']);
        $department = trim($input['department']);

        // Validate formats
        if (!preg_match("/^[a-zA-Z ]{1,50}$/", $first_name) || !preg_match("/^[a-zA-Z ]{1,50}$/", $last_name)) {
            send_response(['error' => 'First and last names must contain only letters and spaces, up to 50 characters'], 400);
        }
        $valid_departments = ['Computer Science', 'Mathematics', 'Physics', 'Engineering'];
        if (!in_array($department, $valid_departments)) {
            send_response(['error' => 'Invalid department'], 400);
        }

        // Check for existing ID
        $check = $connect->prepare("SELECT id FROM student_details WHERE id = ?");
        $check->bind_param("i", $id);
        $check->execute();
        if ($check->get_result()->num_rows > 0) {
            send_response(['error' => 'ID already exists'], 409);
        }
        $check->close();

        // Insert student
        $stmt = $connect->prepare("INSERT INTO student_details (id, first_name, last_name, department) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("isss", $id, $first_name, $last_name, $department);
        if ($stmt->execute()) {
            error_log(date('[Y-m-d H:i:s] ') . "Student created: ID $id" . PHP_EOL, 3, LOG_FILE);
            send_response(['message' => 'Student created successfully'], 201);
        } else {
            $error = "Error creating student: " . $stmt->error;
            error_log(date('[Y-m-d H:i:s] ') . $error . PHP_EOL, 3, LOG_FILE);
            send_response(['error' => 'Failed to create student'], 500);
        }
        $stmt->close();
        break;

    case 'PUT':
        if (!$id) {
            send_response(['error' => 'ID required for update'], 400);
        }

        $input = json_decode(file_get_contents('php://input'), true);
        if (!$input) {
            send_response(['error' => 'Invalid JSON'], 400);
        }

        // Validate input
        $error = validate_input($input, ['first_name', 'last_name', 'department']);
        if ($error) {
            send_response(['error' => $error], 400);
        }

        $first_name = trim($input['first_name']);
        $last_name = trim($input['last_name']);
        $department = trim($input['department']);

        // Validate formats
        if (!preg_match("/^[a-zA-Z ]{1,50}$/", $first_name) || !preg_match("/^[a-zA-Z ]{1,50}$/", $last_name)) {
            send_response(['error' => 'First and last names must contain only letters and spaces, up to 50 characters'], 400);
        }
        $valid_departments = ['Computer Science', 'Mathematics', 'Physics', 'Engineering'];
        if (!in_array($department, $valid_departments)) {
            send_response(['error' => 'Invalid department'], 400);
        }

        // Check if student exists
        $check = $connect->prepare("SELECT id FROM student_details WHERE id = ?");
        $check->bind_param("i", $id);
        $check->execute();
        if ($check->get_result()->num_rows === 0) {
            send_response(['error' => 'Student not found'], 404);
        }
        $check->close();

        // Update student
        $stmt = $connect->prepare("UPDATE student_details SET first_name = ?, last_name = ?, department = ? WHERE id = ?");
        $stmt->bind_param("sssi", $first_name, $last_name, $department, $id);
        if ($stmt->execute()) {
            error_log(date('[Y-m-d H:i:s] ') . "Student updated: ID $id" . PHP_EOL, 3, LOG_FILE);
            send_response(['message' => 'Student updated successfully']);
        } else {
            $error = "Error updating student: " . $stmt->error;
            error_log(date('[Y-m-d H:i:s] ') . $error . PHP_EOL, 3, LOG_FILE);
            send_response(['error' => 'Failed to update student'], 500);
        }
        $stmt->close();
        break;

    case 'DELETE':
        if (!$id) {
            send_response(['error' => 'ID required for deletion'], 400);
        }

        // Check if student exists
        $check = $connect->prepare("SELECT id FROM student_details WHERE id = ?");
        $check->bind_param("i", $id);
        $check->execute();
        if ($check->get_result()->num_rows === 0) {
            send_response(['error' => 'Student not found'], 404);
        }
        $check->close();

        // Delete student
        $stmt = $connect->prepare("DELETE FROM student_details WHERE id = ?");
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            error_log(date('[Y-m-d H:i:s] ') . "Student deleted: ID $id" . PHP_EOL, 3, LOG_FILE);
            send_response(['message' => 'Student deleted successfully']);
        } else {
            $error = "Error deleting student: " . $stmt->error;
            error_log(date('[Y-m-d H:i:s] ') . $error . PHP_EOL, 3, LOG_FILE);
            send_response(['error' => 'Failed to delete student'], 500);
        }
        $stmt->close();
        break;

    default:
        send_response(['error' => 'Method not allowed'], 405);
}

$connect->close();
?>