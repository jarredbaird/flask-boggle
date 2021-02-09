from flask import Flask, request, render_template, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension
import sys

from boggle import Boggle

app = Flask(__name__)
app.config["SECRET_KEY"] = "chickenbutt"

debug = DebugToolbarExtension(app)
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SESSION_REFRESH_EACH_REQUEST'] = False

boggle_game = Boggle()

@app.route("/")
def display_something():
    board = boggle_game.make_board()
    session['board'] = board

    return render_template("index.html", board=board)


@app.route("/check-answer")
def check_answer():
    print('Hello world!', file=sys.stderr)
    word = request.args["word"]
    board = session["board"]
    response = boggle_game.check_valid_word(board, word)

    return jsonify({'result': response})
