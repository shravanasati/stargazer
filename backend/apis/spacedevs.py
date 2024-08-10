import requests

class SpacedevsAPI:
    def __init__(self):
        pass
    
    def events(self):
        response = requests.get(url="https://ll.thespacedevs.com/2.2.0/event/")
        eventlst = []
        for item in range(10):
            eventlst.append({'name': response.json()['results'][item]['name'], 'description': response.json()['results'][1]['description'], 'image': response.json()['results'][1]['feature_image']})
            
        return (eventlst)
            
        

if __name__ == "__main__":
   SpacedevsAPI()