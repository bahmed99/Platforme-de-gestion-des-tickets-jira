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

    def GetReponse(self,id_user):
        projects = db.projects.find_one({
                "id_user": id_user
                })

        if not(projects):
            return jsonify({ "message": True }), 200
        return jsonify({"message": False}), 200
    
    def GetSelectedProjects(self,id_user):
        projects = db.projects.find_one({
                "id_user": id_user
                })

        if not(projects):
            return jsonify({ "error": "This user don't have any project" }), 401
        return jsonify({"projects": projects}), 200
    



  


   