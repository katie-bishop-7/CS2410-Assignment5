import re
import os
from http.server import BaseHTTPRequestHandler, HTTPServer

filename = "favs.txt"

class HTTPRequestHandler(BaseHTTPRequestHandler):
    def do_PUT(self):
        if re.search('/api/update-favs', self.path):
            length = int(self.headers.get('content-length'))
            data = self.rfile.read(length).decode('utf8')

            # Write the data to the file
            f = open(filename, "w")
            f.write(data)
            f.close()

            self.send_response(200)
        else:
            self.send_response(403)
        self.end_headers()

    def do_GET(self):
        path_without_query = self.path.split('?')[0]
        file_requested = path_without_query.split('/')[-1]

        if os.path.isfile(file_requested):
            self.send_response(200)
            self.send_header('Content-Type', 'text.html')
            self.end_headers()
            self.wfile.write(bytes(open(file_requested).read(), 'utf-8'))

        else:
            self.send_response(404, 'Not Found: record does not exist')
            self.end_headers()

        
if __name__ == '__main__':
    server = HTTPServer(('localhost', 8000), HTTPRequestHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    server.server_close()