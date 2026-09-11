<?php
require_once __DIR__ . '/../config/config.php';

session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, 'POST method required.', [], 405);
}

$input = getJsonInput();
$username = clean((string)($input['username'] ?? ''));
$password = (string)($input['password'] ?? '');

if (hash_equals(ADMIN_USERNAME, $username) && hash_equals(ADMIN_PASSWORD, $password)) {
    session_regenerate_id(true);
    $_SESSION['admin_logged_in'] = true;
    $_SESSION['admin_username'] = $username;
    jsonResponse(true, 'Admin login successful.');
}

jsonResponse(false, 'Invalid username or password.', [], 401);
