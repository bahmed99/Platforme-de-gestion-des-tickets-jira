
from utils import convert_visuals,connect_jira
from flask import jsonify, request
from Models.visuals import Visuals
import os

from jira.client import JIRA


def SaveVisuals(id_user):
        visuals = {
            "id_user": id_user,  # id user mich unique
            "visuals": request.json.get('visuals'),
            "projet": request.json.get('projet'),
            "data": [[]],
            "last_ticket_id": ""
        }
        print(visuals)
        # id_visual, data, visual:suivi bug
        visual = Visuals(
            id_user=id_user, visuals=visuals["visuals"], projet=visuals["projet"])
        check_visual = Visuals.objects(id_user=id_user,projet=visuals["projet"])
        if check_visual:
            check_visual.update(visuals=request.json.get('visuals'))
            return jsonify({"message": "Updated successfully"}), 200
        else:
            visual.save()
            return jsonify({"message": "Saved successfully"}), 200
  
  
  
def GetSelectedVisuals(id_user):
        visuals = Visuals.objects.get(id_user= id_user)


        if not(visuals):
            return jsonify({ "error": "This user don't have any visual" }), 401
            
        return jsonify({"visuals": visuals["visuals"]}), 200



def GetData(id_user, jira_domaine,email,jira_token):
    jira=connect_jira(jira_domaine,email,jira_token)
    result=Visuals.objects.get(id_user=id_user,projet=request.json.get('projet'))

    if not(result):
        return jsonify({ "error": "Session expired" }), 401
        
    else: 
        data,last_ticket=convert_visuals(result['visuals'],result['projet'],jira_domaine,id_user,jira)
        Visuals.objects.update(data=data,last_ticket_id=last_ticket)
        return jsonify({"message": "Updated successfully"}), 200
            
            
            

