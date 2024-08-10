import logging
from pathlib import Path
from flask import Flask, send_from_directory

from apis.cache import redis_close
from apis.nasa import NasaAPI
from apis.spacedevs import SpacedevsAPI

app = Flask(__file__)
dist_dir = Path(__file__).parent.parent / "dist"
app.static_folder = str(dist_dir)
assets_folder = str(dist_dir / "assets")
nasa_client = NasaAPI()
spacedevs_client = SpacedevsAPI()


@app.teardown_appcontext
def teardown_redis(exception):
    redis_close()


@app.get("/")
def index():
    return send_from_directory(app.static_folder, "index.html")


@app.get("/<path:path>")
def assets(path):
    return send_from_directory(app.static_folder, path)


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
        logging.error("error in events endpoint")
        logging.exception(e)
        return {"error": "an internal server error occured, please try again later"}


@app.get("/api/news")
def news():
    try:
        return spacedevs_client.news()
    except Exception as e:
        logging.error("error in events endpoint")
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
        logging.error("error in events endpoint")
        logging.exception(e)
        return {"error": "an internal server error occured, please try again later"}


@app.get("/api/fireball_map")
def fireball_map():
    return {"html": nasa_client.fireball_map().read().decode("utf-8")}


if __name__ == "__main__":
    app.run()
