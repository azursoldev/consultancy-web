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
