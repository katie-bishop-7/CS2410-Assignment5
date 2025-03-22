# You don't need to modify this if you don't want to
# Start with: python server.py
# localhost:8000 is the url to access the server

import re
import os
from http.server import BaseHTTPRequestHandler, HTTPServer
import mimetypes

filename = "favs.txt"

class HTTPRequestHandler(BaseHTTPRequestHandler):
    def do_PUT(self):
        if re.search('/api/update-favs', self.path):
            length = int(self.headers.get('content-length'))
            data = self.rfile.read(length).decode('utf-8')

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
        file_requested = path_without_query.lstrip('/')  # Remove leading slash

        if os.path.isfile(file_requested):
            self.send_response(200)

            # Guess content type based on file extension
            content_type, _ = mimetypes.guess_type(file_requested)
            if content_type is None:
                content_type = 'application/octet-stream'

            self.send_header('Content-Type', content_type)
            self.end_headers()

            # Open the file in binary mode
            with open(file_requested, 'rb') as f:
                self.wfile.write(f.read())
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