<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/cors.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, 'POST method required.', [], 405);
}

$input = getJsonInput();
$email = clean((string)($input['email'] ?? ''));

if (!validEmail($email)) {
    jsonResponse(false, 'Please enter a valid email address.', [], 422);
}

$existing = readJson('subscribers.json');
foreach ($existing as $subscriber) {
    if (strcasecmp($subscriber['email'] ?? '', $email) === 0) {
        jsonResponse(true, 'This email is already subscribed.');
    }
}

if (!appendJson('subscribers.json', [
    'email' => $email,
    'created_at' => date('Y-m-d H:i:s')
])) {
    jsonResponse(false, 'Could not save subscription.', [], 500);
}

jsonResponse(true, 'Successfully subscribed to updates.');
