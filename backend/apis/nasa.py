from datetime import datetime, timedelta
from io import BytesIO
import logging
import os
import folium
from nasapy import Nasa, fireballs
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

    def _fireballs(self):
        today = datetime.now().date()
        last_month = today - timedelta(days=90)
        df = fireballs(date_min=str(last_month), return_df=True)
        df.dropna(inplace=True)
        df["lat"] = df["lat"].astype(float)
        df["lon"] = df["lon"].astype(float)
        df["energy"] = df["energy"].astype(float)
        return df

    def fireball_map(self):
        m = folium.Map(zoom_start=4)
        fb = self._fireballs()
        for i in range(0, len(fb)):
            folium.Circle(
                location=[fb.iloc[i]["lat"], fb.iloc[i]["lon"]],
                tooltip=[
                    "Date: " + fb.iloc[i]["date"],
                    "\nLat/Lon: "
                    + str(fb.iloc[i]["lat"])
                    + ", "
                    + str(fb.iloc[i]["lon"]),
                ],
                radius=fb.iloc[i]["energy"] * 10,
                color="red",
                fill=True,
                fill_color="red",
            ).add_to(m)

        html_buf = BytesIO()
        m.save(html_buf, close_file=False)
        html_buf.seek(0)
        return html_buf


if __name__ == "__main__":
    print(NasaAPI()._fireballs())
