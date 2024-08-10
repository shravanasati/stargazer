# Website Content 

import requests

class SpacedevsAPI:
    def __init__(self):
        self.base_url = "https://ll.thespacedevs.com"
    
    
    def events(self):
        response = requests.get(url=f"{self.base_url}/2.2.0/event/")
        eventlst = []
        for item in range(10):
            eventlst.append({'name': response.json()['results'][item]['name'], 'description': response.json()['results'][item]['description'], 'image': response.json()['results'][item]['feature_image']})
            
        return eventlst
    
    
    def launches(self):
        response = requests.get(url=f"{self.base_url}/2.2.0/launch/")
        launchlst = []
        
        for item in range(10):
            launchlst.append({"name": response.json()['results'][item]['name'], "rocket": response.json()['results'][item]['rocket']['configuration']['name'], "time": response.json()['results'][item]['window_start']})

        return launchlst
    
    
    def news(self):
        response = requests.get(url="https://api.spaceflightnewsapi.net/v4/articles")
        newslst = []
        
        for item in range(10):
            newslst.append({"title": response.json()['results'][item]['title'], "image": response.json()['results'][item]['image_url'], "site": response.json()['results'][item]['news_site']})
            
        return newslst
       
    
if __name__ == "__main__":
    SpacedevsAPI()