<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/cors.php';

jsonResponse(true, 'Backend is running.', [
    'app' => APP_NAME,
    'server_time' => date('Y-m-d H:i:s')
]);
