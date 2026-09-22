<?php
/**
 * Amstel Consulting — Secure Server-Side SMTP Form Dispatcher
 * Dispatches all website form enquiries to:
 *   - info@amstel.ng
 *   - support@amstel.ng
 *   - dpo@amstel.ng
 *
 * Connects directly to mail.amstel.ng:587 over TLS.
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
    exit;
}

// 1. Extract form payload (JSON or standard POST / FormData)
$inputJSON = file_get_contents('php://input');
$data = json_decode($inputJSON, true);
if (!$data || !is_array($data)) {
    $data = $_POST;
}

function cleanInput($val) {
    if (!$val) return '';
    return htmlspecialchars(trim(strip_tags($val)), ENT_QUOTES, 'UTF-8');
}

$fullName       = cleanInput($data['Full_Name'] ?? $data['fullName'] ?? 'Not Provided');
$email          = filter_var(trim($data['Email'] ?? $data['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$company        = cleanInput($data['Company_And_Industry'] ?? $data['company'] ?? 'Not Provided');
$phone          = cleanInput($data['Phone_Or_WhatsApp'] ?? $data['phone'] ?? 'Not Provided');
$records        = cleanInput($data['Estimated_Records'] ?? $data['recordCount'] ?? 'Not Specified');
$objectives     = cleanInput($data['Compliance_Objectives'] ?? $data['objectives'] ?? 'General Inquiry');
$message        = cleanInput($data['Message'] ?? $data['message'] ?? 'None provided');
$context        = cleanInput($data['Form_Context'] ?? $data['context'] ?? 'Consultation Request');
$sourcePage     = cleanInput($data['Source_Page'] ?? $data['sourcePage'] ?? ($_SERVER['HTTP_REFERER'] ?? 'Website'));

if (!$email) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'A valid work email address is required.']);
    exit;
}

// 2. SMTP Configuration
$smtpHost = 'mail.amstel.ng';
$smtpPort = 587;
$smtpUser = 'info@amstel.ng';
$smtpPass = 'mjFfwhKFdLzvUWHXN6jN';

$recipients = [
    'info@amstel.ng',
    'support@amstel.ng',
    'dpo@amstel.ng'
];

$subject = "New Lead: {$company} - {$context}";

// 3. Build HTML Email Body
$htmlBody = '
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
  .card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
  .header { background: #0f172a; padding: 20px 24px; color: #ffffff; border-bottom: 3px solid #d04a02; }
  .header h2 { margin: 0 0 6px 0; font-size: 18px; font-weight: 700; }
  .header p { margin: 0; font-size: 13px; color: #94a3b8; }
  .content { padding: 24px; }
  .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px; }
  .table th { width: 34%; text-align: left; padding: 10px 12px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; color: #475569; font-weight: 600; }
  .table td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; color: #0f172a; }
  .badge { display: inline-block; padding: 4px 10px; background: #fff7ed; color: #d04a02; border: 1px solid #ffedd5; border-radius: 4px; font-weight: 600; font-size: 12px; }
  .footer { background: #f8fafc; padding: 14px 24px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; text-align: center; }
</style>
</head>
<body>
<div class="card">
  <div class="header">
    <h2>Amstel Consulting &bull; Client Inquiry</h2>
    <p>Incoming Consultation / DPCO Service Request</p>
  </div>
  <div class="content">
    <table class="table">
      <tr><th>Context / Service</th><td><span class="badge">' . htmlspecialchars($context) . '</span></td></tr>
      <tr><th>Full Name</th><td><strong>' . htmlspecialchars($fullName) . '</strong></td></tr>
      <tr><th>Work Email</th><td><a href="mailto:' . htmlspecialchars($email) . '">' . htmlspecialchars($email) . '</a></td></tr>
      <tr><th>Company &amp; Industry</th><td>' . htmlspecialchars($company) . '</td></tr>
      <tr><th>Phone / WhatsApp</th><td>' . htmlspecialchars($phone) . '</td></tr>
      <tr><th>Estimated Records</th><td>' . htmlspecialchars($records) . '</td></tr>
      <tr><th>Selected Objectives</th><td>' . htmlspecialchars($objectives) . '</td></tr>
      <tr><th>Message / Scope</th><td>' . nl2br(htmlspecialchars($message)) . '</td></tr>
      <tr><th>Source URL</th><td><a href="' . htmlspecialchars($sourcePage) . '" style="color: #64748b; font-size: 12px;">' . htmlspecialchars($sourcePage) . '</a></td></tr>
      <tr><th>Received At</th><td>' . gmdate('Y-m-d H:i:s') . ' UTC</td></tr>
    </table>
  </div>
  <div class="footer">
    Dispatched securely via Amstel Consulting Licensed DPCO Web Gateway to info@amstel.ng, support@amstel.ng, and dpo@amstel.ng.
  </div>
</div>
</body>
</html>
';

// 4. Standalone Socket SMTP Client with STARTTLS
function sendViaSocketSMTP($host, $port, $user, $pass, $from, $toAddresses, $subject, $htmlBody, $replyTo) {
    $timeout = 15;
    $socket = @fsockopen($host, $port, $errno, $errstr, $timeout);
    if (!$socket) {
        throw new Exception("Could not connect to SMTP host: {$errstr} ({$errno})");
    }

    $read = function() use ($socket) {
        $response = '';
        while ($line = fgets($socket, 515)) {
            $response .= $line;
            if (substr($line, 3, 1) === ' ') break;
        }
        return $response;
    };

    $send = function($cmd) use ($socket, $read) {
        fputs($socket, $cmd . "\r\n");
        return $read();
    };

    $res = $read();
    if (substr($res, 0, 3) !== '220') throw new Exception("Invalid greeting: {$res}");

    $res = $send("EHLO " . ($_SERVER['SERVER_NAME'] ?? 'localhost'));
    $res = $send("STARTTLS");
    if (substr($res, 0, 3) !== '220') throw new Exception("STARTTLS failed: {$res}");

    $crypto = stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
    if (!$crypto) throw new Exception("TLS negotiation failed");

    $res = $send("EHLO " . ($_SERVER['SERVER_NAME'] ?? 'localhost'));
    $res = $send("AUTH LOGIN");
    if (substr($res, 0, 3) !== '334') throw new Exception("AUTH LOGIN rejected: {$res}");

    $res = $send(base64_encode($user));
    if (substr($res, 0, 3) !== '334') throw new Exception("Username rejected: {$res}");

    $res = $send(base64_encode($pass));
    if (substr($res, 0, 3) !== '235') throw new Exception("Authentication failed: {$res}");

    $res = $send("MAIL FROM:<{$from}>");
    if (substr($res, 0, 3) !== '250') throw new Exception("MAIL FROM rejected: {$res}");

    $acceptedCount = 0;
    foreach ($toAddresses as $rcpt) {
        $res = $send("RCPT TO:<{$rcpt}>");
        if (substr($res, 0, 3) === '250') {
            $acceptedCount++;
        }
    }
    if ($acceptedCount === 0) {
        throw new Exception("No recipients accepted by server");
    }

    $res = $send("DATA");
    if (substr($res, 0, 3) !== '354') throw new Exception("DATA rejected: {$res}");

    $headers = [];
    $headers[] = "Date: " . date('r');
    $headers[] = "From: Amstel Consulting Lead Desk <{$from}>";
    $headers[] = "To: " . implode(', ', $toAddresses);
    $headers[] = "Reply-To: {$replyTo}";
    $headers[] = "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=";
    $headers[] = "MIME-Version: 1.0";
    $headers[] = "Content-Type: text/html; charset=UTF-8";
    $headers[] = "Content-Transfer-Encoding: base64";
    $headers[] = "X-Mailer: Amstel DPCO Gateway";

    $rawContent = implode("\r\n", $headers) . "\r\n\r\n" . chunk_split(base64_encode($htmlBody)) . "\r\n.";
    $res = $send($rawContent);
    if (substr($res, 0, 3) !== '250') throw new Exception("Message body rejected: {$res}");

    $send("QUIT");
    fclose($socket);
    return true;
}

// 5. Attempt Delivery
try {
    sendViaSocketSMTP(
        $smtpHost,
        $smtpPort,
        $smtpUser,
        $smtpPass,
        $smtpUser,
        $recipients,
        $subject,
        $htmlBody,
        $email
    );

    echo json_encode([
        'success' => true,
        'message' => 'Consultation inquiry dispatched successfully to info@amstel.ng, support@amstel.ng, and dpo@amstel.ng.'
    ]);
} catch (Exception $e) {
    // Fallback: try PHP mail() if local sendmail is available
    $headers  = "From: info@amstel.ng\r\n";
    $headers .= "Reply-To: {$email}\r\n";
    $headers .= "Cc: support@amstel.ng, dpo@amstel.ng\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    $mailSent = @mail('info@amstel.ng', $subject, $htmlBody, $headers);
    if ($mailSent) {
        echo json_encode(['success' => true, 'message' => 'Sent via server mail agent.']);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'SMTP dispatch error: ' . $e->getMessage()
        ]);
    }
}
