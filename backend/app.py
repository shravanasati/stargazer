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


@app.get("/events")
def events():
    return spacedevs_client.events()


@app.get("/launches")
def launches():
    return spacedevs_client.launches()


@app.get("/ping")
def ping():
    return {"message": "pong"}


if __name__ == "__main__":
    app.run()
