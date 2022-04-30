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
  
    pred = Prediction_Number_Participants(data["issue"],data["priority"],data["date"].split("-")[0],data["date"].split("-")[2],data["date"].split("-")[1],data["component"],data["version"],data["typeversion"])
    return jsonify({"pred": int(pred)}), 200


def prediction_hours_service():
    data = {
        "issue": request.json.get('issue'),
        "priority": request.json.get('priority'),
        "component": request.json.get('component'),
        "version":request.json.get('version'),
        "typeversion":request.json.get('typeversion'),
        "date":request.json.get('date') ,
        "number":request.json.get('number')
    }

    print(data)
  
    pred = Prediction_Number_Hours(data["issue"],data["priority"],data["date"].split("-")[0],data["date"].split("-")[2],data["date"].split("-")[1],data["component"],data["version"],data["typeversion"],data["number"])
    return jsonify({"pred": int(pred)}), 200