<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/cors.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, 'POST method required.', [], 405);
}

$input = getJsonInput();

$name = clean((string)($input['name'] ?? ''));
$email = clean((string)($input['email'] ?? ''));
$phone = clean((string)($input['phone'] ?? ''));
$message = clean((string)($input['message'] ?? ''));

if ($name === '' || $email === '' || $message === '') {
    jsonResponse(false, 'Name, email and message are required.', [], 422);
}
if (!validEmail($email)) {
    jsonResponse(false, 'Please enter a valid email address.', [], 422);
}

$record = [
    'name' => $name,
    'email' => $email,
    'phone' => $phone,
    'message' => $message,
    'created_at' => date('Y-m-d H:i:s')
];

if (!appendJson('contacts.json', $record)) {
    jsonResponse(false, 'Could not save your message.', [], 500);
}

sendSubmissionNotification('New KTM website enquiry', $record);

jsonResponse(true, 'Thank you! Your message has been received.');
