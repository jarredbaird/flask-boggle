from flask import Flask, render_template, redirect
from flask_debugtoolbar import DebugToolbarExtension

from boggle import Boggle

app = Flask(__name__)
app.config["SECRET_KEY"] = "chickenbutt"

debug = DebugToolbarExtension(app)
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

boggle_game = Boggle()


@app.route("/")
def display_something():
    return render_template("base.html.j2")


@app.route("/click")
def click_test():
    return redirect("/")
