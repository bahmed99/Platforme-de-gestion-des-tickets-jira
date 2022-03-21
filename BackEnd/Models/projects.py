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

from user import User

from mongoengine import *

class Projects(User) :
    user = ReferenceField(User)
    ListProjects = ListField(StringField(max_length=70))
    SelectedProjects = ListField(StringField(max_length=70))
    
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
        return str(json.dumps(json.loads(response.text), sort_keys=True, indent=4, separators=(",", ": ")))
    

    

  


   