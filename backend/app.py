from datetime import timedelta
import logging
import os
from pathlib import Path
import pickle
from flask import Flask, abort, request, send_from_directory, session

from dotenv import load_dotenv

from apis.cache import redis_close, redis_conn
from apis.nasa import NasaAPI
from apis.spacedevs import SpacedevsAPI
from apis.chatbot import create_chat

load_dotenv()

redis_client = redis_conn()
app = Flask(__file__)
app.secret_key = os.environ["SECRET_KEY"]
dist_dir = Path(__file__).parent.parent / "dist"
app.static_folder = str(dist_dir)
assets_folder = str(dist_dir / "assets")
nasa_client = NasaAPI()
spacedevs_client = SpacedevsAPI()
HOUR_TIMEDELTA = timedelta(hours=1)


@app.teardown_appcontext
def teardown_redis(exception):
    redis_close()


@app.before_request
def make_session_permanent():
    session.permanent = True
    app.permanent_session_lifetime = HOUR_TIMEDELTA


@app.get("/")
def index():
    return send_from_directory(app.static_folder, "index.html")


@app.get("/<path:path>")
def assets(path):
    return send_from_directory(app.static_folder, path)


@app.errorhandler(404)
def not_found_handler():
    return send_from_directory(app.static_folder, "index.html")


@app.get("/api/events")
def events():
    try:
        return spacedevs_client.events()
    except Exception as e:
        logging.error("error in events endpoint")
        logging.exception(e)
        return {"error": "an internal server error occured, please try again later"}


@app.get("/api/launches")
def launches():
    try:
        return spacedevs_client.launches()
    except Exception as e:
        logging.error("error in launches endpoint")
        logging.exception(e)
        return {"error": "an internal server error occured, please try again later"}


@app.get("/api/news")
def news():
    try:
        return spacedevs_client.news()
    except Exception as e:
        logging.error("error in news endpoint")
        logging.exception(e)
        return {"error": "an internal server error occured, please try again later"}


@app.get("/api/ping")
def ping():
    return {"message": "pong"}


@app.get("/api/potd")
def potd():
    try:
        return nasa_client.potd()
    except Exception as e:
        logging.error("error in potd endpoint")
        logging.exception(e)
        return {"error": "an internal server error occured, please try again later"}


@app.get("/api/fireball_map")
def fireball_map():
    return {"html": nasa_client.fireball_map().read().decode("utf-8")}


@app.post("/api/chat/send")
def chat_gemini():
    rjson = request.get_json()
    if not rjson:
        abort(415)

    query = rjson.get("message")
    if not query:
        abort(400)

    if "chatID" in session:
        chatID = session["chatID"]
        pickled_chat = redis_client.get(chatID)
        if not pickled_chat:
            return {"message": "Your session has expired. Please try again later."}
        chat = pickle.loads(pickled_chat)
    else:
        chatID, chat = create_chat()
        chat.history

    resp = chat.send_message(query)
    session["chatID"] = chatID
    pickled_chat = pickle.dumps(chat)
    redis_client.setex(chatID, HOUR_TIMEDELTA, pickled_chat)
    return {"message": resp}


@app.get("/api/chat/list")
def chat_history():
    if "chatID" in session:
        chatID = session["chatID"]
        pickled_chat = redis_client.get(chatID)
        if not pickled_chat:
            return []

        chat = pickle.loads(pickled_chat)
        return chat.history

    return []


if __name__ == "__main__":
    app.run()
