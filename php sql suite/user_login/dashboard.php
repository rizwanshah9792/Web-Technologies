<?php
session_start();
require_once 'auth.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 class="text-2xl font-bold mb-6 text-center">Welcome, <?php echo htmlspecialchars($_SESSION['user_name']); ?>!</h1>
        <?php if (isset($_SESSION['message'])): ?>
            <div class="<?php echo strpos($_SESSION['message'], 'Error') === false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'; ?> p-4 mb-6 rounded">
                <?php echo $_SESSION['message']; ?>
            </div>
            <?php unset($_SESSION['message']); ?>
        <?php endif; ?>
        <p class="text-center text-gray-600 mb-6">You are now logged in to your dashboard.</p>
        <div class="space-y-4">
            <a href="logout.php" class="block w-full bg-red-600 text-white p-2 rounded-md text-center hover:bg-red-700">Logout</a>
            <a href="register.php" class="block text-center text-indigo-600 hover:underline">Register Another User</a>
        </div>
    </div>
</body>
</html>