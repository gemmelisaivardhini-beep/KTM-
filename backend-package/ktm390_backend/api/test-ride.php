<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/cors.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, 'POST method required.', [], 405);
}

$input = getJsonInput();

$model = clean((string)($input['model'] ?? ''));
$name = clean((string)($input['name'] ?? ''));
$email = clean((string)($input['email'] ?? ''));
$phone = clean((string)($input['phone'] ?? ''));
$city = clean((string)($input['city'] ?? ''));
$date = clean((string)($input['date'] ?? ''));
$preferred_time = clean((string)($input['preferred_time'] ?? ''));

if ($model === '' || $name === '' || $phone === '' || $city === '' || $date === '') {
    jsonResponse(false, 'Model, name, phone, city and date are required.', [], 422);
}
if ($email !== '' && !validEmail($email)) {
    jsonResponse(false, 'Please enter a valid email address.', [], 422);
}

$record = [
    'model' => $model,
    'name' => $name,
    'email' => $email,
    'phone' => $phone,
    'city' => $city,
    'date' => $date,
    'preferred_time' => $preferred_time,
    'created_at' => date('Y-m-d H:i:s')
];

if (!appendJson('test_rides.json', $record)) {
    jsonResponse(false, 'Could not save the test ride request.', [], 500);
}

sendSubmissionNotification('New KTM test ride booking', $record);

jsonResponse(true, 'Test ride request submitted successfully.');
