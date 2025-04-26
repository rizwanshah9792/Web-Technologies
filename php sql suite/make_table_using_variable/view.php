<?php
session_start();
include 'db_connection.php';
require_once 'config.php';

// Fetch data from student_details table
$result = $connect->query("SELECT id, first_name, last_name, department FROM student_details");
$students = []; // Array to store data

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $students[] = $row; // Store each row in the array
    }
    $result->free();
} else {
    $error = "Error fetching data: " . $connect->error;
    error_log(date('[Y-m-d H:i:s] ') . $error . PHP_EOL, 3, LOG_FILE);
    $_SESSION['message'] = $error;
}

$connect->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Details Table</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h1 class="text-2xl font-bold mb-6 text-center">Student Details</h1>
        <?php
        if (isset($_SESSION['message'])) {
            echo "<div class='bg-red-100 text-red-700 p-4 mb-6 rounded'>{$_SESSION['message']}</div>";
            unset($_SESSION['message']);
        }
        ?>
        <?php if (empty($students)): ?>
            <p class="text-center text-gray-600">No student records found.</p>
        <?php else: ?>
            <div class="overflow-x-auto">
                <table class="min-w-full bg-white border border'strict';
            border: 1px solid #e5e7eb;">
                    <thead>
                        <tr class="bg-gray-200">
                            <th class="py-2 px-4 border-b text-left">ID</th>
                            <th class="py-2 px-4 border-b text-left">First Name</th>
                            <th class="py-2 px-4 border-b text-left">Last Name</th>
                            <th class="py-2 px-4 border-b text-left">Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($students as $student): ?>
                            <tr class="hover:bg-gray-50">
                                <td class="py-2 px-4 border-b"><?php echo htmlspecialchars($student['id']); ?></td>
                                <td class="py-2 px-4 border-b"><?php echo htmlspecialchars($student['first_name']); ?></td>
                                <td class="py-2 px-4 border-b"><?php echo htmlspecialchars($student['last_name']); ?></td>
                                <td class="py-2 px-4 border-b"><?php echo htmlspecialchars($student['department']); ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        <?php endif; ?>
        <div class="mt-6 text-center">
            <a href="index.php" class="text-indigo-600 hover:underline">Back to Insert Form</a>
        </div>
    </div>
</body>
</html>