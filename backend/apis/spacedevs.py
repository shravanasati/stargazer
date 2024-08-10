# Website Content 

import requests

class SpacedevsAPI:
    def __init__(self):
        self.base_url = "https://ll.thespacedevs.com"
        self.launches()
    
    
    def events(self):
        response = requests.get(url=f"{self.base_url}/2.2.0/event/")
        eventlst = []
        for item in range(10):
            eventlst.append({'name': response.json()['results'][item]['name'], 'description': response.json()['results'][1]['description'], 'image': response.json()['results'][1]['feature_image']})
            
        return eventlst
    
    
    def launches(self):
        response = requests.get(url=f"{self.base_url}/2.2.0/launch/")
        launchlst = []
        
        for item in range(10):
            launchlst.append({"name": response.json()['results'][item]['name'], "rocket": response.json()['results'][0]['rocket']['configuration']['name'], "time": response.json()['results'][0]['window_start']})

        return launchlst
    
    
    # def news(self):
    #     response = requests.get(url=f"{self.base_url}/v4/articles/")
    #     newslst = []
    
    
if __name__ == "__main__":
    SpacedevsAPI()