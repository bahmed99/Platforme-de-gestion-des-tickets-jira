import requests
from requests.auth import HTTPBasicAuth
import json
from jira.client import JIRA
from flask import  jsonify, request
from Models.projects import Projects
import os
import pandas as pd


def GetAllProjects(jira_domaine,email,jira_token):
    url = "{}rest/api/3/project".format(jira_domaine)

    auth = HTTPBasicAuth(email, jira_token)

    headers = {
        "Accept": "application/json"
    }

    response = requests.request(
        "GET",
        url,
        headers=headers,
        auth=auth
    )
    return json.dumps(json.loads(response.text), sort_keys=True, indent=4, separators=(",", ": "))


def Saveprojects(id_user):
        projects = {
            "id_user":id_user,
            "all_projects": request.json.get('all_projects'),
            "selected_projects": request.json.get('selected_projects'),
            }
        
        project=Projects(id_user=projects['id_user'],all_projects=projects['all_projects'],selected_projects=projects['selected_projects'])

        if project.save():
            return jsonify({ "message": "Saved successfully" }), 200

        return jsonify({ "error": "Signup failed" }), 400


def GetReponse(id_user,jira_domaine):
    projects = Projects.objects(id_user= id_user)

    if(jira_domaine==""):

        if(not(os.path.isdir('./data_files/{}'.format(id_user)))):
            return jsonify({ "message": True ,"file":True}), 200
        else :
            return jsonify({"message": False,"file":False,"user":"file"}), 200


    else:
        if not(projects):
            return jsonify({ "message": True ,"file":False}), 200
        else :
            return jsonify({"message": False,"file":False,"user":"jira"}), 200

def GetSelectedProjects(id_user):
        projects = Projects.objects.get(id_user= id_user)


        if not(projects):
            return jsonify({ "error": "This user don't have any project" }), 401
            
        return jsonify({"projects": projects}), 200

def Updateprojects(id_user):
    selected_projects=request.json.get('selected_projects')

    projects = Projects.objects.get(id_user= id_user)

    if not(projects):
        return jsonify({ "error": "Session expired" }), 401

    
    projects.objects.update(selected_projects=selected_projects)

    return jsonify({ "message": "Password updated" }), 201


def GetProject(user_id):
        data =pd.read_csv("./data_files/{}/data.csv".format(user_id))
        projects=list(set(data['Nom du projet']))
        projects = {
                "id_user":user_id,
                "all_projects": projects,
                "selected_projects": projects
                }
            

        project=Projects(id_user=projects['id_user'],all_projects=projects['all_projects'],selected_projects=projects['selected_projects'])
        project.save()
           
        return jsonify({"projects":projects["selected_projects"]}), 200