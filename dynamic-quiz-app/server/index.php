<?php
/**
 * Lightweight PHP wrapper for environments like XAMPP/Apache.
 * It simply serves the compiled client application without needing routing.
 */

declare(strict_types=1);

$publicIndex = realpath(__DIR__ . '/../public/index.html');

if ($publicIndex && file_exists($publicIndex)) {
    // Send a basic HTML response. Additional headers can be added if needed.
    header('Content-Type: text/html; charset=UTF-8');
    readfile($publicIndex);
    exit;
}

// Fallback: redirect if the file is missing or unreadable.
header('Location: /public/index.html');
exit;

