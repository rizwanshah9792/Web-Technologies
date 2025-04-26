<?php
session_start();
include 'db_connection.php';
require_once 'config.php';

// Fetch all users
$result = $connect->query("SELECT id, name, email, created_at FROM users");
$users = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    $result->free();
} else {
    $error = "Error fetching users: " . $connect->error;
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
    <title>User Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen p-6">
    <div class="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 class="text-2xl font-bold mb-6 text-center">Registered Users</h1>
        <?php if (isset($_SESSION['message'])): ?>
            <div class="<?php echo strpos($_SESSION['message'], 'Error') === false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'; ?> p-4 mb-6 rounded">
                <?php echo $_SESSION['message']; ?>
            </div>
            <?php unset($_SESSION['message']); ?>
        <?php endif; ?>
        <?php if (empty($users)): ?>
            <p class="text-center text-gray-600">No users registered.</p>
        <?php else: ?>
            <div class="overflow-x-auto">
                <table class="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr class="bg-gray-200">
                            <th class="py-2 px-4 border-b text-left">ID</th>
                            <th class="py-2 px-4 border-b text-left">Name</th>
                            <th class="py-2 px-4 border-b text-left">Email</th>
                            <th class="py-2 px-4 border-b text-left">Registered On</th>
                            <th class="py-2 px-4 border-b text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($users as $user): ?>
                            <tr class="hover:bg-gray-50">
                                <td class="py-2 px-4 border-b"><?php echo htmlspecialchars($user['id']); ?></td>
                                <td class="py-2 px-4 border-b"><?php echo htmlspecialchars($user['name']); ?></td>
                                <td class="py-2 px-4 border-b"><?php echo htmlspecialchars($user['email']); ?></td>
                                <td class="py-2 px-4 border-b"><?php echo htmlspecialchars($user['created_at']); ?></td>
                                <td class="py-2 px-4 border-b">
                                    <a href="edit.php?id=<?php echo $user['id']; ?>" class="text-blue-600 hover:underline">Edit</a>
                                    <a href="delete.php?id=<?php echo $user['id']; ?>" class="text-red-600 hover:underline ml-4" onclick="return confirm('Are you sure you want to delete this user?');">Delete</a>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        <?php endif; ?>
        <div class="mt-6 text-center">
            <a href="register.php" class="text-indigo-600 hover:underline">Register New User</a>
        </div>
    </div>
</body>
</html>