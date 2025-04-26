<?php
session_start();
include 'db_connection.php';
require_once 'config.php';

// Generate CSRF token
if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

// Fetch user data for editing
$user = null;
if (isset($_GET['id'])) {
    $id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
    if ($id === false || $id <= 0) {
        $_SESSION['message'] = "Error: Invalid user ID.";
        header("Location: dashboard.php");
        exit;
    }
    $stmt = $connect->prepare("SELECT id, name, email FROM users WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows === 0) {
        $_SESSION['message'] = "Error: User not found.";
        header("Location: dashboard.php");
        exit;
    }
    $user = $result->fetch_assoc();
    $stmt->close();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Verify CSRF token
    if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
        $_SESSION['message'] = "Error: Invalid CSRF token.";
        error_log(date('[Y-m-d H:i:s] ') . $_SESSION['message'] . PHP_EOL, 3, LOG_FILE);
        header("Location: dashboard.php");
        exit;
    }
    unset($_SESSION['csrf_token']);

    // Retrieve and sanitize inputs
    $id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
    $name = trim(filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING));
    $email = trim(filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL));
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Validation
    if ($id === false || $id <= 0) {
        $_SESSION['message'] = "Error: Invalid user ID.";
        error_log(date('[Y-m-d H:i:s] ') . $_SESSION['message'] . PHP_EOL, 3, LOG_FILE);
        header("Location: dashboard.php");
        exit;
    }
    if (empty($name) || empty($email)) {
        $_SESSION['message'] = "Error: Name and email are required.";
        error_log(date('[Y-m-d H:i:s] ') . $_SESSION['message'] . PHP_EOL, 3, LOG_FILE);
        header("Location: edit.php?id=$id");
        exit;
    }
    if (!preg_match("/^[a-zA-Z ]{1,50}$/", $name)) {
        $_SESSION['message'] = "Error: Name must contain only letters and spaces, up to 50 characters.";
        error_log(date('[Y-m-d H:i:s] ') . $_SESSION['message'] . PHP_EOL, 3, LOG_FILE);
        header("Location: edit.php?id=$id");
        exit;
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['message'] = "Error: Invalid email format.";
        error_log(date('[Y-m-d H:i:s] ') . $_SESSION['message'] . PHP_EOL, 3, LOG_FILE);
        header("Location: edit.php?id=$id");
        exit;
    }
    if (!empty($password) && strlen($password) < 8) {
        $_SESSION['message'] = "Error: Password must be at least 8 characters.";
        error_log(date('[Y-m-d H:i:s] ') . $_SESSION['message'] . PHP_EOL, 3, LOG_FILE);
        header("Location: edit.php?id=$id");
        exit;
    }
    if ($password !== $confirm_password) {
        $_SESSION['message'] = "Error: Passwords do not match.";
        error_log(date('[Y-m-d H:i:s] ') . $_SESSION['message'] . PHP_EOL, 3, LOG_FILE);
        header("Location: edit.php?id=$id");
        exit;
    }

    // Check for email conflict
    $check = $connect->prepare("SELECT id FROM users WHERE email = ? AND id != ?");
    $check->bind_param("si", $email, $id);
    $check->execute();
    if ($check->get_result()->num_rows > 0) {
        $_SESSION['message'] = "Error: Email already in use by another user.";
        error_log(date('[Y-m-d H:i:s] ') . $_SESSION['message'] . PHP_EOL, 3, LOG_FILE);
        $check->close();
        header("Location: edit.php?id=$id");
        exit;
    }
    $check->close();

    // Update user
    if (empty($password)) {
        // Update without changing password
        $stmt = $connect->prepare("UPDATE users SET name = ?, email = ? WHERE id = ?");
        $stmt->bind_param("ssi", $name, $email, $id);
    } else {
        // Update with new password
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $connect->prepare("UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?");
        $stmt->bind_param("sssi", $name, $email, $hashed_password, $id);
    }

    if ($stmt->execute()) {
        $_SESSION['message'] = "User updated successfully.";
        error_log(date('[Y-m-d H:i:s] ') . "User updated: $email" . PHP_EOL, 3, LOG_FILE);
    } else {
        $_SESSION['message'] = "Error: Update failed - " . $stmt->error;
        error_log(date('[Y-m-d H:i:s] ') . $_SESSION['message'] . PHP_EOL, 3, LOG_FILE);
    }

    $stmt->close();
    $connect->close();
    header("Location: dashboard.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit User</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 class="text-2xl font-bold mb-6 text-center">Edit User</h1>
        <?php if (isset($_SESSION['message'])): ?>
            <div class="<?php echo strpos($_SESSION['message'], 'Error') === false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'; ?> p-4 mb-6 rounded">
                <?php echo $_SESSION['message']; ?>
            </div>
            <?php unset($_SESSION['message']); ?>
        <?php endif; ?>
        <?php if ($user): ?>
            <form method="post" class="space-y-4">
                <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
                <input type="hidden" name="id" value="<?php echo $user['id']; ?>">
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" name="name" id="name" value="<?php echo htmlspecialchars($user['name']); ?>" required
                           class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                </div>
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" name="email" id="email" value="<?php echo htmlspecialchars($user['email']); ?>" required
                           class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">New Password (optional)</label>
                    <input type="password" name="password" id="password"
                           class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                </div>
                <div>
                    <label for="confirm_password" class="block text-sm font-medium text-gray-700">Confirm New Password</label>
                    <input type="password" name="confirm_password" id="confirm_password"
                           class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                </div>
                <div>
                    <button type="submit" class="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700">Update</button>
                </div>
            </form>
        <?php else: ?>
            <p class="text-center text-red-600">User not found.</p>
        <?php endif; ?>
        <div class="mt-4 text-center">
            <a href="dashboard.php" class="text-indigo-600 hover:underline">Back to Dashboard</a>
        </div>
    </div>
</body>
</html>