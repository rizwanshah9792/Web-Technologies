<?php
session_start();
include 'db_connection.php';
require_once 'config.php';

// Generate CSRF token
if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Verify CSRF token
    if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
        $_SESSION['message'] = "Error: Invalid CSRF token.";
        error_log(date('[Y-m-d H:i:s] ') . $_SESSION['message'] . PHP_EOL, 3, LOG_FILE);
        header("Location: login.php");
        exit;
    }
    unset($_SESSION['csrf_token']);

    // Retrieve and sanitize inputs
    $email = trim(filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL));
    $password = $_POST['password'];

    // Store form data for persistence
    $_SESSION['form_data'] = ['email' => $email];

    // Validation
    if (empty($email) || empty($password)) {
        $_SESSION['message'] = "Error: Email and password are required.";
        error_log(date('[Y-m-d H:i:s] ') . $_SESSION['message'] . PHP_EOL, 3, LOG_FILE);
        header("Location: login.php");
        exit;
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['message'] = "Error: Invalid email format.";
        error_log(date('[Y-m-d H:i:s] ') . $_SESSION['message'] . PHP_EOL, 3, LOG_FILE);
        header("Location: login.php");
        exit;
    }

    // Check user credentials
    $stmt = $connect->prepare("SELECT id, name, email, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            // Successful login
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];
            $_SESSION['message'] = "Login successful! Welcome, " . $user['name'] . ".";
            error_log(date('[Y-m-d H:i:s] ') . "User logged in: $email" . PHP_EOL, 3, LOG_FILE);
            unset($_SESSION['form_data']);
            header("Location: dashboard.php");
            exit;
        } else {
            $_SESSION['message'] = "Error: Incorrect password.";
            error_log(date('[Y-m-d H:i:s] ') . $_SESSION['message'] . PHP_EOL, 3, LOG_FILE);
        }
    } else {
        $_SESSION['message'] = "Error: Email not found.";
        error_log(date('[Y-m-d H:i:s] ') . $_SESSION['message'] . PHP_EOL, 3, LOG_FILE);
    }

    $stmt->close();
    $connect->close();
    header("Location: login.php");
    exit;
}

// Retrieve form data for persistence
$email = isset($_SESSION['form_data']['email']) ? htmlspecialchars($_SESSION['form_data']['email']) : '';
unset($_SESSION['form_data']);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>
        <?php if (isset($_SESSION['message'])): ?>
            <div class="<?php echo strpos($_SESSION['message'], 'Error') === false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'; ?> p-4 mb-6 rounded">
                <?php echo $_SESSION['message']; ?>
            </div>
            <?php unset($_SESSION['message']); ?>
        <?php endif; ?>
        <form method="post" class="space-y-4">
            <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" id="email" value="<?php echo $email; ?>" required
                       class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
            </div>
            <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" name="password" id="password" required
                       class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
            </div>
            <div>
                <button type="submit" class="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700">Login</button>
            </div>
        </form>
        <div class="mt-4 text-center">
            <a href="register.php" class="text-indigo-600 hover:underline">Don't have an account? Register</a>
        </div>
    </div>
</body>
</html>