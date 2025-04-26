<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Insert Student Details</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        form {
            max-width: 400px;
            margin: 0 auto;
        }
        label {
            display: inline-block;
            width: 120px;
            margin-bottom: 10px;
        }
        input[type="number"], input[type="text"] {
            width: 200px;
            padding: 5px;
            margin-bottom: 10px;
        }
        input[type="submit"] {
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
        }
        input[type="submit"]:hover {
            background-color: #45a049;
        }
        .message {
            margin-bottom: 20px;
            padding: 10px;
            border-radius: 5px;
        }
        .success {
            background-color: #dff0d8;
            color: #3c763d;
        }
        .error {
            background-color: #f2dede;
            color: #a94442;
        }
    </style>
</head>
<body>
    <h1>Insert Student Details</h1>
    <?php
    session_start();
    if (isset($_SESSION['message'])) {
        $message_class = strpos($_SESSION['message'], 'Error') === false ? 'success' : 'error';
        echo "<div class='message $message_class'>" . $_SESSION['message'] . "</div>";
        unset($_SESSION['message']);
    }
    ?>
    <form method="post" action="insert.php">
        <label for="id">ID:</label>
        <input type="number" name="id" id="id" required><br>
        <label for="first_name">First Name:</label>
        <input type="text" name="first_name" id="first_name" required><br>
        <label for="last_name">Last Name:</label>
        <input type="text" name="last_name" id="last_name" required><br>
        <label for="department">Department:</label>
        <input type="text" name="department" id="department" required><br>
        <input type="submit" value="Submit">
    </form>
</body>
</html>