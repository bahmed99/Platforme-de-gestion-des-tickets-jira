from sqlite3 import Date
from flask import  jsonify, request
from passlib.hash import pbkdf2_sha256
from app import db,mail
from jira.client import JIRA
import uuid

from utils import secret_key

from utils import require_login

import requests
from requests.auth import HTTPBasicAuth
import json

from Models.user import User

import datetime
from app import db
import os
import pandas as pd

class Projects() :
    def GetAllProjects(self,jira_domaine,email,jira_token):
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
    

    def Saveprojects(self,id_user):
            projects = {
                "_id": uuid.uuid4().hex,
                "id_user":id_user,
                "all_projects": request.json.get('all_projects'),
                "selected_projects": request.json.get('selected_projects'),
                }
            

            if db.projects.insert_one(projects):
                return jsonify({ "message": "Saved successfully" }), 200

            return jsonify({ "error": "Signup failed" }), 400

    def GetReponse(self,id_user,jira_domaine):
        projects = db.projects.find_one({
                "id_user": id_user
                })

        
       
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



        
    
    def GetSelectedProjects(self,id_user):
        projects = db.projects.find_one({
                "id_user": id_user
                })

        if not(projects):
            return jsonify({ "error": "This user don't have any project" }), 401
        return jsonify({"projects": projects}), 200
    

    def Updateprojects(self, id_user):
        selected_projects=request.json.get('selected_projects')

        projects = db.projects.find_one({
        "id_user": id_user
        })

        if not(projects):
            return jsonify({ "error": "Session expired" }), 401

        
        db.projects.find_one_and_update({"id_user":id_user},{'$set':{"selected_projects":selected_projects}})

        return jsonify({ "message": "Password updated" }), 201
    


    def GetProject(self,user_id):
        data =pd.read_csv("./data_files/{}/data.csv".format(user_id))
        projects=list(set(data['Nom du projet']))
        projects = {
                "_id": uuid.uuid4().hex,
                "id_user":user_id,
                "all_projects": projects,
                "selected_projects": projects
                }
            

        db.projects.insert_one(projects)
       
           
        return jsonify({"projects":projects["selected_projects"]}), 200



  


   