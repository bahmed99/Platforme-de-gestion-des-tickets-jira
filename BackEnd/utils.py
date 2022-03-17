from pymongo import MongoClient
from pymongo.server_api import ServerApi
from flask import  jsonify, request, g
import jwt
from functools import wraps
from config import *



def ConnexionBD():
    try:
        db = MongoClient(mongoURI, server_api=ServerApi('1'))

        return db.pcd
    except:
        print("Connexion failed")


def require_login(func):
    @wraps(func)

    def decorated(*args, **kwargs):

        db=ConnexionBD()

        token=request.headers["Authorization"]

        # token = token.replace("Bearer ","")
        
        if not token:
            return jsonify({'Alert!': 'Token is missing!'}), 401

        try:
            id = jwt.decode(token,secret_key,algorithms=["HS256"])

        except:
            return jsonify({'Error': 'Invalid token'}), 403
        
       
        user = db.users.find_one({"_id": id["user"]})

        if not(user):
                return jsonify({'error': 'Invalid token'}), 401

        g.user=user
        return func(*args, **kwargs)
    
    return decorated
   
