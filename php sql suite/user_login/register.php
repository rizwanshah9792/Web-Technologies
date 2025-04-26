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
        header("Location: register.php");
        exit;
    }
    unset($_SESSION['csrf_token']);

    // Retrieve and sanitize inputs
    $name = trim(filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING));
    $email = trim(filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL));
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Store form data for persistence
    $_SESSION['form_data'] = ['name' => $name, 'email' => $email];

    // Validation
    if (empty($name) || empty($email) || empty($password)) {
        $_SESSION['message'] = "Error: All fields are required.";
        error_log(date('[Y-m-d H:i:s] ') . $_SESSION['message'] . PHP_EOL, 3, LOG_FILE);
        header("Location: register.php");
        exit;
    }
    if (!preg_match("/^[a-zA-Z ]{1,50}$/", $name)) {
        $_SESSION['message'] = "Error: Name must contain only letters and spaces, up to 50 characters.";
        error_log(date('[Y-m-d H:i:s] ') . $_SESSION['message'] . PHP_EOL, 3, LOG_FILE);
        header("Location: register.php");
        exit;
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['message'] = "Error: Invalid email format.";
        error_log(date('[Y-m-d H:i:s] ') . $_SESSION['message'] . PHP_EOL, 3, LOG_FILE);
        header("Location: register.php");
        exit;
    }
    if (strlen($password) < 8) {
        $_SESSION['message'] = "Error: Password must be at least 8 characters.";
        error_log(date('[Y-m-d H:i:s] ') . $_SESSION['message'] . PHP_EOL, 3, LOG_FILE);
        header("Location: register.php");
        exit;
    }
    if ($password !== $confirm_password) {
        $_SESSION['message'] = "Error: Passwords do not match.";
        error_log(date('[Y-m-d H:i:s] ') . $_SESSION['message'] . PHP_EOL, 3, LOG_FILE);
        header("Location: register.php");
        exit;
    }

    // Check for existing email
    $check = $connect->prepare("SELECT id FROM users WHERE email = ?");
    $check->bind_param("s", $email);
    $check->execute();
    if ($check->get_result()->num_rows > 0) {
        $_SESSION['message'] = "Error: Email already registered.";
        error_log(date('[Y-m-d H:i:s] ') . $_SESSION['message'] . PHP_EOL, 3, LOG_FILE);
        $check->close();
        header("Location: register.php");
        exit;
    }
    $check->close();

    // Hash password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Insert user
    $stmt = $connect->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $hashed_password);

    if ($stmt->execute()) {
        $_SESSION['message'] = "Registration successful! Please log in.";
        error_log(date('[Y-m-d H:i:s] ') . "User registered: $email" . PHP_EOL, 3, LOG_FILE);
        unset($_SESSION['form_data']);
        header("Location: login.php");
        exit;
    } else {
        $_SESSION['message'] = "Error: Registration failed - " . $stmt->error;
        error_log(date('[Y-m-d H:i:s] ') . $_SESSION['message'] . PHP_EOL, 3, LOG_FILE);
        header("Location: register.php");
        exit;
    }

    $stmt->close();
    $connect->close();
}

// Retrieve form data for persistence
$name = isset($_SESSION['form_data']['name']) ? htmlspecialchars($_SESSION['form_data']['name']) : '';
$email = isset($_SESSION['form_data']['email']) ? htmlspecialchars($_SESSION['form_data']['email']) : '';
unset($_SESSION['form_data']);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 class="text-2xl font-bold mb-6 text-center">Register</h1>
        <?php if (isset($_SESSION['message'])): ?>
            <div class="<?php echo strpos($_SESSION['message'], 'Error') === false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'; ?> p-4 mb-6 rounded">
                <?php echo $_SESSION['message']; ?>
            </div>
            <?php unset($_SESSION['message']); ?>
        <?php endif; ?>
        <form method="post" class="space-y-4">
            <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" name="name" id="name" value="<?php echo $name; ?>" required
                       class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
            </div>
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
                <label for="confirm_password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input type="password" name="confirm_password" id="confirm_password" required
                       class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
            </div>
            <div>
                <button type="submit" class="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700">Register</button>
            </div>
        </form>
        <div class="mt-4 text-center">
            <a href="login.php" class="text-indigo-600 hover:underline">Already have an account? Log in</a>
        </div>
    </div>
</body>
</html>