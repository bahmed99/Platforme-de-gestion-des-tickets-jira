from sqlite3 import Date
from flask import jsonify, request
from passlib.hash import pbkdf2_sha256
from jira.client import JIRA
import uuid
from flask import  g
from utils import secret_key

from utils import require_login

import requests
from requests.auth import HTTPBasicAuth
import json
from Models.projects import Projects
from Models.user import User

import datetime
from app import db


class Visuals:
    def SaveVisuals(self,id_user):
        visuals = {
            "_id": uuid.uuid4().hex,
            "id_user":id_user,
            "visuals": request.json.get('visuals'),
        }

        if db.visuals.insert_one(visuals):
            return jsonify({"message": "Saved successfully"}), 200

        return jsonify({"error": "Signup failed"}), 400
