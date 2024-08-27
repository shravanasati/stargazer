from datetime import timedelta
import json
from .cache import redis_conn
import requests


class SpacedevsAPI:
    def __init__(self):
        self.base_url = "https://ll.thespacedevs.com"
        self.redis = redis_conn()

    def events(self):
        if resp := self.redis.get("SPACEDEVS_EVENTS"):
            return json.loads(resp)

        response = requests.get(url=f"{self.base_url}/2.2.0/event/")
        results = response.json()["results"]
        eventlst = []
        for item in range(len(results)):
            eventlst.append(
                {
                    "name": results[item]["name"],
                    "description": results[item]["description"],
                    "image": results[item]["feature_image"],
                }
            )

        self.redis.setex("SPACEDEVS_EVENTS", timedelta(hours=1), json.dumps(eventlst))

        return eventlst

    def launches(self):
        if resp := self.redis.get("SPACEDEVS_LAUNCHES"):
            return json.loads(resp)

        response = requests.get(url=f"{self.base_url}/2.2.0/launch/")
        results = response.json()["results"]
        launchlst = []

        for item in range(len(results)):
            launchlst.append(
                {
                    "name": results[item]["name"],
                    "time": results[item]["window_start"],
                }
            )

        self.redis.setex(
            "SPACEDEVS_LAUNCHES", timedelta(hours=1), json.dumps(launchlst)
        )
        return launchlst

    def news(self):
        if resp := self.redis.get("SPACEDEVS_NEWS"):
            return json.loads(resp)

        response = requests.get(url="https://api.spaceflightnewsapi.net/v4/articles")
        results = response.json()["results"]
        newslst = []

        for item in range(len(results)):
            newslst.append(
                {
                    "title": results[item]["title"],
                    "image": results[item]["image_url"],
                    "site": results[item]["news_site"],
                }
            )

        self.redis.setex(
            "SPACEDEVS_NEWS", timedelta(hours=1), json.dumps(newslst)
        )
        return newslst


if __name__ == "__main__":
    SpacedevsAPI()
