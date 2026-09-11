<?php
require_once __DIR__ . '/../config/config.php';

requireAdmin();

$contacts = readJson('contacts.json');
$rides = readJson('test_rides.json');
$subscribers = readJson('subscribers.json');

jsonResponse(true, 'Dashboard data loaded.', [
    'contacts_count' => count($contacts),
    'test_rides_count' => count($rides),
    'subscribers_count' => count($subscribers),
    'contacts' => $contacts,
    'test_rides' => $rides,
    'subscribers' => $subscribers
]);
