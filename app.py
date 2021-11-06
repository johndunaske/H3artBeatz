"""
Author: Stephen Malinowski

"""

from flask import Flask, make_response, Blueprint, send_file, send_from_directory, request, redirect
from flask_sockets import Sockets
import json
import sys

html = Blueprint(r'html', __name__, static_folder="frontend/build/", static_url_path="/")
ws = Blueprint(r'ws', __name__)

indexFilepath = "index.html"
@html.route('/')
def serveIndex():
    return html.send_static_file("index.html")

email_to_socket = {}
username_to_team = {}
list_of_sockets = []
socket_to_email = {}
Cards_Backlog = []


@ws.route('/websocket')
def socket_helper(socket):
    while not socket.closed:                            # While this socket is not closed do the following
        for sock in list_of_sockets:
            message = socket.receive()
            if message is not None:
                dejsonify = json.loads(message)
                #Tillos function call / jazz with these things
                #With the output getting sent in a message looking like the following #HEADS UP JOHN
                if "incoming" in dejsonify:
                    if not sock.closed:
                        sock.send(json.dumps({"BPM": dejsonify["incoming"]}))
    list_of_sockets.remove(socket)



app = Flask(__name__, static_folder="frontend/build/", static_url_path="/")
sockets = Sockets(app)
app.register_blueprint(html, url_prefix=r'/')
sockets.register_blueprint(ws, url_prefix=r'/')

if __name__ == "__main__":
    from gevent import pywsgi
    from geventwebsocket.handler import WebSocketHandler
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5000
    server = pywsgi.WSGIServer(('', port), app, handler_class=WebSocketHandler)
    server.serve_forever()
