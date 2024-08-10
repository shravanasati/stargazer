import logging
import os
from nasapy import Nasa
from .cache import redis_conn
from dotenv import load_dotenv

load_dotenv()


class NasaAPI:
    def __init__(self) -> None:
        self.nasa = Nasa(os.environ["NASA_API_KEY"])
        self.redis = redis_conn()

    def potd(self):
        """
        Return the picture of the day.
        """
        try:
            if resp := self.redis.hgetall("NASA_POTD"):
                return resp

            resp = self.nasa.picture_of_the_day(hd=True)
            mapping = {
                "title": resp["title"],
                "hdurl": resp["hdurl"],
                "url": resp["url"],
                "description": resp["explanation"],
            }
            self.redis.hset(
                "NASA_POTD",
                mapping=mapping,
            )
            return resp

        except Exception as e:
            logging.error("error occured while fetching POTD")
            logging.exception(e)
            return {"error": "Unable to load the picture of the day."}
