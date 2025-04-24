<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $file = fopen("subscribers.txt", "a");
    fwrite($file, $email . "\n");
    fclose($file);
    header("Location: thankyou.html"); // Optional redirect
}
?>
