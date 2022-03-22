from sqlite3 import Date
from flask import  jsonify, request
import uuid
import jwt
from utils import secret_key

class Visuals :
    def register_visuals(self) :
        return 0