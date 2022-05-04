
from http.client import CannotSendRequest
from utils import *
from flask import jsonify, request
from Models.visuals import Visuals
import os
import threading


from jira.client import JIRA


def SaveVisuals(id_user):
        visuals = {
            "id_user": id_user,  # id user mich unique
            "visuals": request.json.get('visuals'),
            "projet": request.json.get('projet'),
            "data": {},
            "card_data":{},
            "last_ticket_id": "0"
        }
        print(visuals)
        # id_visual, data, visual:suivi bug
        visual = Visuals(
            id_user=id_user, visuals=visuals["visuals"],last_ticket_id=visuals["last_ticket_id"],projet=visuals["projet"])

        check_visual = Visuals.objects(id_user=id_user,projet=visuals["projet"])


        if check_visual:
            check_visual.update(visuals=request.json.get('visuals'))
            return jsonify({"message": "Updated successfully"}), 200
        else:
            visual.save()
            return jsonify({"message": "Saved successfully"}), 200
  
  
  
def GetSelectedVisuals(id_user,projet,jira_domaine,email,jira_token):
    
        visuals = Visuals.objects(id_user= id_user, projet = projet)

        if not(visuals):
            return jsonify({ "visuals": [] }), 200
            
        visuals = Visuals.objects.get(id_user= id_user, projet=projet)

        if(jira_domaine!=""):
            jira=connect_jira(jira_domaine,email,jira_token)
            if (not (check_last_ticket(jira,visuals["last_ticket_id"],visuals["projet"])[0])):    
                return jsonify({"visuals": visuals["visuals"],"statistics":visuals["data"]}), 200
            else:
                if ("Suivi des bugs" in visuals["visuals"]):
                    update_bugs_by_month_jira(jira,visuals["data"]["Suivi des bugs"],visuals["last_ticket_id"],visuals["projet"])
                if ("Ticket par priorité et par mois" in visuals["visuals"]):
                    update_issues_by_priority_month_jira(jira,visuals["data"]["Ticket par priorité et par mois"],visuals["last_ticket_id"],visuals["projet"])
                if ("Ticket par statut et par client" in visuals["visuals"] ):
                    update_issues_by_status_jira(jira,visuals["data"]["Ticket par statut et par client"],visuals["last_ticket_id"],visuals["projet"])
                if ("Nombre de demandes par priorité" in visuals["visuals"]):
                    update_issues_by_priority_jira(jira,visuals["data"]["Nombre de demandes par priorité"],visuals["last_ticket_id"],visuals["projet"])
                visuals.update(last_ticket_id=(check_last_ticket(jira,visuals["last_ticket_id"],visuals["projet"])[1]),data=visuals["data"])
                return jsonify({"visuals": visuals["visuals"],"statistics":visuals["data"]}), 200
        return jsonify({"visuals": visuals["visuals"],"statistics":visuals["data"]}), 200


def GetData(id_user, jira_domaine,email,jira_token):
    
    jira=""
    if(jira_domaine!=""):
        jira=connect_jira(jira_domaine,email,jira_token)
    result=Visuals.objects(id_user=id_user,projet=request.json.get('projet'))
    if not(result):
        return jsonify({ "error": "Session expired" }), 401 
    result=Visuals.objects.get(id_user=id_user,projet=request.json.get('projet'))
    data,last_ticket=convert_visuals(request.json.get('element'),result['projet'],jira_domaine,id_user,jira,result["data"])
    result.update(data=data,last_ticket_id=last_ticket)
    return jsonify({"result": result["data"],"card_data":result["card_data"]}), 200

def update_visuals_service(id_user):
    result=Visuals.objects(id_user=id_user,projet=request.json.get('projet'))
    if not(result):
        return jsonify({ "error": "no data" }), 401    
            
    result=Visuals.objects.get(id_user=id_user,projet=request.json.get('projet'))
    data=result["data"]
    data[request.json.get('element')]=[]
    result.update(data=data)
    return jsonify({"result": result["data"]}), 200

def getCardData(id_user,jira_domaine,jira_token,email):
    jira=""
    data=dict()
    visuals={
            "id_user": id_user,  # id user mich unique
            "visuals": [],
            "projet": request.json.get('projet'),
            "data": {},
            "card_data":{},
            "last_ticket_id": "0"
        }
    if(jira_domaine!=""):
        jira=connect_jira(jira_domaine,email,jira_token)

   
    threads=[]
    data["dateDebut"]=[0,0,0]
    data["bugs"]={'nb_bugs':0,'pourcentage':0,'arrow':""}
    data["n_closed"]={}
    data["open"]=[-1]
    data["closed"]=[-1]
      
    threads.append(threading.Thread(target=date_debut_projet,args=(jira,request.json.get('projet'),data["dateDebut"])))
    threads.append(threading.Thread(target=get_bugs,args=(request.json.get('projet'),jira,data["bugs"])))
    threads.append(threading.Thread(target=get_tickets_no_closed,args=(jira,request.json.get('projet'),data["n_closed"])))
    threads.append(threading.Thread(target=ticketsToday,args=(jira,request.json.get('projet'),data["open"])))
    threads.append(threading.Thread(target=ticketsTodayClosed,args=(jira,request.json.get('projet'),data["closed"])))
    for t in threads:
        t.start()

    for t in threads:
        t.join()

    
    return jsonify({"card_data":data}), 200
