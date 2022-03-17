from flask import  jsonify, request
from passlib.hash import pbkdf2_sha256
from app import db
from jira.client import JIRA
import uuid
import jwt
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from utils import secret_key

class User :

    def signup(self):
            
            user = {
                "_id": uuid.uuid4().hex,
                "name": request.json.get('name'),
                "email": request.json.get('email'),
                "password": request.json.get('password'),
                "jira_token":request.json.get('token'),
                "jira_domaine":request.json.get('domaine'),
                "reset_token":"",
                "expire_token":""
                }

        
            user['password'] = pbkdf2_sha256.encrypt(user['password'])

            if db.users.find_one({ "email": user['email'] }):
                return jsonify({ "error": "Email address already in use" }), 400
            

            if(user["jira_token"]!="" and user["jira_domaine"]!=""):

                try :
                    auth_jira = JIRA(basic_auth=(user["email"], user["jira_token"]),options={'server': user["jira_domaine"]})

                except :

                    return jsonify({ "error": "Invalid signup credentials" }), 400

            if db.users.insert_one(user):
                return jsonify({ "message": "Saved successfully" }), 200

            return jsonify({ "error": "Signup failed" }), 400



    def login(self):
        user = db.users.find_one({
                "email": request.json.get('email')
                })

        if not(user):
            return jsonify({ "error": "Invalid email" }), 401  

        if not(pbkdf2_sha256.verify(request.json.get('password'), user['password'])):
            return jsonify({ "error": "Invalid password" }), 401 

         
        
        token = jwt.encode({'user': user['_id']},secret_key)      
        

        return jsonify({"token": token}), 200   

    
    def forgot_password():

          s = Serializer(secret_key, 360000)
          token=s.dumps({'user_id':"5015005egegeggegr"}).decode('utf-8')
          

    def new_password():
        print("hello")  


