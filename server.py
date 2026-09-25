import http.server
import socketserver
import os
import urllib.parse

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

LEGACY_REDIRECTS = {
    '/service-car.html': '/services/compliance-audit-return.html',
    '/service-car': '/services/compliance-audit-return.html',
    '/service-dpo.html': '/services/outsourced-dpo.html',
    '/service-dpo': '/services/outsourced-dpo.html',
    '/service-audit.html': '/services/data-protection-audit.html',
    '/service-audit': '/services/data-protection-audit.html',
    '/data-protection-audit.html': '/services/data-protection-audit.html',
    '/service-training.html': '/services/data-privacy-training.html',
    '/service-training': '/services/data-privacy-training.html',
    '/data-privacy-training.html': '/services/data-privacy-training.html',
    '/services.html': '/services/index.html',
    '/vapt.html': '/services/vapt-services.html',
    '/vapt': '/services/vapt-services.html',
    '/vapt-services': '/services/vapt-services.html',
    '/vapt-services.html': '/services/vapt-services.html',
    '/services/vapt': '/services/vapt-services.html',
    '/organisation.html': '/about.html',
    '/organisation': '/about.html',
    '/terms-and-conditions.html': '/terms-of-service.html',
    '/topics.html': '/blog/index.html'
}

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path in LEGACY_REDIRECTS:
            self.send_response(301)
            self.send_header('Location', LEGACY_REDIRECTS[path])
            self.end_headers()
            return

        # Check clean URL mappings
        clean_path = path.lstrip('/')
        target = os.path.join(DIRECTORY, clean_path)

        if os.path.isfile(target):
            return super().do_GET()

        # Check path + '.html'
        if os.path.isfile(target + '.html'):
            self.path = path + '.html'
            if parsed.query:
                self.path += '?' + parsed.query
            return super().do_GET()

        # Check trimmed trailing slash + '.html'
        trimmed = clean_path.rstrip('/')
        if trimmed and os.path.isfile(os.path.join(DIRECTORY, trimmed + '.html')):
            self.path = '/' + trimmed + '.html'
            if parsed.query:
                self.path += '?' + parsed.query
            return super().do_GET()

        return super().do_GET()

    def do_HEAD(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path in LEGACY_REDIRECTS:
            self.send_response(301)
            self.send_header('Location', LEGACY_REDIRECTS[path])
            self.end_headers()
            return

        clean_path = path.lstrip('/')
        target = os.path.join(DIRECTORY, clean_path)

        if os.path.isfile(target):
            return super().do_HEAD()

        if os.path.isfile(target + '.html'):
            self.path = path + '.html'
            return super().do_HEAD()

        trimmed = clean_path.rstrip('/')
        if trimmed and os.path.isfile(os.path.join(DIRECTORY, trimmed + '.html')):
            self.path = '/' + trimmed + '.html'
            return super().do_HEAD()

        return super().do_HEAD()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path in ('/send-mail.php', '/send-mail', '/api/send-mail'):
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode('utf-8')
            
            # Parse urlencoded or json or multipart
            import json
            import smtplib
            from email.mime.multipart import MIMEMultipart
            from email.mime.text import MIMEText

            data = {}
            content_type = self.headers.get('Content-Type', '')
            if 'application/json' in content_type:
                try:
                    data = json.loads(body)
                except Exception:
                    data = {}
            else:
                data = urllib.parse.parse_qs(body)
                data = {k: v[0] for k, v in data.items()}

            full_name = data.get('Full_Name') or data.get('fullName') or 'Not Provided'
            email = data.get('Email') or data.get('email') or ''
            company = data.get('Company_And_Industry') or data.get('company') or 'Not Provided'
            phone = data.get('Phone_Or_WhatsApp') or data.get('phone') or 'Not Provided'
            records = data.get('Estimated_Records') or data.get('recordCount') or 'Not Specified'
            objectives = data.get('Compliance_Objectives') or data.get('objectives') or 'General Inquiry'
            message = data.get('Message') or data.get('message') or 'None provided'
            context = data.get('Form_Context') or data.get('context') or 'Consultation Request'
            source_page = data.get('Source_Page') or data.get('sourcePage') or self.headers.get('Referer', 'Website')

            recipients = ['info@amstelconsulting.ng', 'support@amstelconsulting.ng', 'dpo@amstelconsulting.ng']
            subject = f"New Lead: {company} - {context}"

            html_body = f"""<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: sans-serif; background: #f8fafc; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden;">
    <div style="background: #0f172a; padding: 20px; color: #fff; border-bottom: 3px solid #d04a02;">
      <h2 style="margin: 0 0 6px;">Amstel Consulting &bull; Client Inquiry</h2>
      <p style="margin: 0; font-size: 13px; color: #94a3b8;">Incoming Consultation / DPCO Service Request</p>
    </div>
    <div style="padding: 20px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 8px; font-weight: bold; width: 35%;">Context:</td><td style="padding: 8px;">{context}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Full Name:</td><td style="padding: 8px;">{full_name}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Work Email:</td><td style="padding: 8px;"><a href="mailto:{email}">{email}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Company:</td><td style="padding: 8px;">{company}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">{phone}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Estimated Records:</td><td style="padding: 8px;">{records}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Objectives:</td><td style="padding: 8px;">{objectives}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Message:</td><td style="padding: 8px;">{message}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Source Page:</td><td style="padding: 8px;">{source_page}</td></tr>
      </table>
    </div>
  </div>
</body>
</html>"""

            try:
                msg = MIMEMultipart('alternative')
                msg['Subject'] = subject
                msg['From'] = 'Amstel Lead Desk <info@amstelconsulting.ng>'
                msg['To'] = ', '.join(recipients)
                if email:
                    msg['Reply-To'] = email
                msg.attach(MIMEText(html_body, 'html'))

                server = smtplib.SMTP('mail.amstel.ng', 587, timeout=12)
                server.starttls()
                server.login('info@amstel.ng', 'mjFfwhKFdLzvUWHXN6jN')
                server.sendmail('info@amstel.ng', recipients, msg.as_string())
                server.quit()

                resp_payload = json.dumps({'success': True, 'message': 'Dispatched via SMTP'}).encode('utf-8')
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(resp_payload)))
                self.end_headers()
                self.wfile.write(resp_payload)
                return
            except Exception as e:
                resp_payload = json.dumps({'success': False, 'error': str(e)}).encode('utf-8')
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(resp_payload)))
                self.end_headers()
                self.wfile.write(resp_payload)
                return

        self.send_response(404)
        self.end_headers()

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

if __name__ == '__main__':
    with ReusableTCPServer(("", PORT), CustomHandler) as httpd:
        print(f"Server running at http://localhost:{PORT}/")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
