<?php
// Enable error reporting for debugging (remove in production)
ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once '../../config/db.php';

try {
    $stmt = $pdo->query("SELECT * FROM hostels");
    $hostels = $stmt->fetchAll();

    echo json_encode([
        'status' => 'success',
        'hostels' => $hostels
    ]);
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to fetch hostels.',
        'error' => $e->getMessage()
    ]);
}
?>
