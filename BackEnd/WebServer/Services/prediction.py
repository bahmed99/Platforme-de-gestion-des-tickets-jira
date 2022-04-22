from utils import *

def prediction_participants():
    data = {
        "issue": request.json.get('issue'),
        "priority": request.json.get('priority'),
        "component": request.json.get('component'),
        "version":request.json.get('version'),
        "typeversion":request.json.get('typeversion'),
        "date":request.json.get('date')
    }
    print(data)
    pred = Prediction_Number_Participants(data["issue"],data["priority"],data["date"].split("-")[0],data["date"].split("-")[2],data["date"].split("-")[1],data["component"],data["version"],data["typeversion"])
    return jsonify({"pred": int(pred)}), 200
