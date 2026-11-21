<?php
declare(strict_types=1);

define('APP_NAME', 'KTM 390 Adventure Backend');
define('BASE_PATH', dirname(__DIR__));
define('DATA_PATH', BASE_PATH . DIRECTORY_SEPARATOR . 'data');
define('LOG_PATH', BASE_PATH . DIRECTORY_SEPARATOR . 'logs');

define('ADMIN_USERNAME', 'admin');
define('ADMIN_PASSWORD', 'admin123'); // Change this before deployment.

// Change this in the server environment before launch if the recipient changes.
// The fallback is transcribed from the supplied project note.
define(
    'BOOKING_NOTIFICATION_EMAIL',
    getenv('BOOKING_NOTIFICATION_EMAIL') ?: 'gemmehisanivasaadmini@gmail.com'
);
define('BOOKING_NOTIFICATION_FROM', getenv('BOOKING_NOTIFICATION_FROM') ?: '');

date_default_timezone_set('Asia/Kolkata');

if (!is_dir(DATA_PATH)) mkdir(DATA_PATH, 0775, true);
if (!is_dir(LOG_PATH)) mkdir(LOG_PATH, 0775, true);

function jsonResponse(bool $success, string $message = '', array $data = [], int $status = 200): never {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data
    ], JSON_UNESCAPED_SLASHES);
    exit;
}

function getJsonInput(): array {
    $raw = file_get_contents('php://input');
    if (!$raw) return $_POST ?: [];
    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
}

function clean(string $value): string {
    return trim(strip_tags($value));
}

function validEmail(string $email): bool {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

function sendSubmissionNotification(string $subject, array $record): bool {
    $recipient = BOOKING_NOTIFICATION_EMAIL;

    if (!validEmail($recipient)) {
        error_log('KTM form notification skipped: notification recipient is invalid.');
        return false;
    }

    $lines = [
        APP_NAME,
        '',
        'A new website submission was received.',
        ''
    ];

    foreach ($record as $label => $value) {
        $readableLabel = ucwords(str_replace('_', ' ', (string)$label));
        $lines[] = $readableLabel . ': ' . (string)$value;
    }

    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8'
    ];

    if (validEmail(BOOKING_NOTIFICATION_FROM)) {
        $headers[] = 'From: ' . BOOKING_NOTIFICATION_FROM;
    }

    $replyTo = (string)($record['email'] ?? '');
    if (validEmail($replyTo)) {
        $headers[] = 'Reply-To: ' . str_replace(["\r", "\n"], '', $replyTo);
    }

    $sent = @mail(
        $recipient,
        str_replace(["\r", "\n"], '', $subject),
        implode("\n", $lines),
        implode("\r\n", $headers)
    );

    if (!$sent) {
        error_log('KTM form notification could not be sent. Submission remains saved locally.');
    }

    return $sent;
}

function appendJson(string $filename, array $record): bool {
    $file = DATA_PATH . DIRECTORY_SEPARATOR . $filename;
    $items = [];

    if (file_exists($file)) {
        $content = file_get_contents($file);
        $items = json_decode($content, true);
        if (!is_array($items)) $items = [];
    }

    $record['id'] = (count($items) ? max(array_column($items, 'id')) : 0) + 1;
    $items[] = $record;

    return file_put_contents(
        $file,
        json_encode($items, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES),
        LOCK_EX
    ) !== false;
}

function readJson(string $filename): array {
    $file = DATA_PATH . DIRECTORY_SEPARATOR . $filename;
    if (!file_exists($file)) return [];
    $items = json_decode(file_get_contents($file), true);
    return is_array($items) ? $items : [];
}

function requireAdmin(): void {
    session_start();
    if (empty($_SESSION['admin_logged_in'])) {
        jsonResponse(false, 'Admin login required.', [], 401);
    }
}
