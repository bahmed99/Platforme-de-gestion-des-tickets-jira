from sqlite3 import Date
from typing_extensions import Required
from flask import  jsonify, request
from passlib.hash import pbkdf2_sha256
from app import db,mail
from jira.client import JIRA
import uuid
import jwt
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from utils import secret_key
from datetime import date
from datetime import timedelta,datetime
from flask_mail import Message


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

    
    def forgot_password(self):
        user = db.users.find_one({
                "email": request.json.get('email')
                })

        if not(user):
            return jsonify({ "error": "Invalid email" }), 401  


        token = Serializer(secret_key, 360000)
        token=token.dumps({'user_id':user["_id"]}).decode('utf-8')

       

        db.users.find_one_and_update({"_id":user["_id"]},{'$set':{"reset_token":token,"expire_token":datetime.now()+timedelta(1/24)}})
        
        try:

            msg = Message(subject="Hello",
                        sender="idrivegears@gmail.com",
                        recipients=user["email"].split())
            msg.html='<p>you requested for password reset</p> <h5> click on this <a href="http://localhost:3000/reset/{}"> Link </a> to reset your password</h5>'.format(token)
                        
            mail.send(msg)
            return jsonify({ "message": "Token sent" }), 200
        except :
            return jsonify({ "error": "Token not sent" }), 400


    def new_password(self):
        token= request.json.get('token')
        password=request.json.get('password')

        user = db.users.find_one({
        "reset_token": token,
        "expire_token":{'$gt': datetime.now()}
        })
        print(user)

        if not(user):
            return jsonify({ "error": "Session expired" }), 401

        
        db.users.find_one_and_update({"_id":user["_id"]},{'$set':{"password":pbkdf2_sha256.encrypt(password) ,"reset_token":"","expire_token":""}})

        return jsonify({ "message": "Password updated" }), 201


    def change_password(self ,user_email):
        user = db.users.find_one({
        "email": user_email
        })


        if not(pbkdf2_sha256.verify(request.json.get('password'), user['password'])):
            return jsonify({ "error": "Invalid password" }), 401 

        token = Serializer(secret_key, 360000)
        token=token.dumps({'user_email':user_email}).decode('utf-8')

        db.users.find_one_and_update({"email":user_email},{'$set':{"reset_token":token,"expire_token":datetime.now()+timedelta(1/24)}})


        try:

            msg = Message(subject="Hello",
                        sender="idrivegears@gmail.com",
                        recipients=user["email"].split())
            msg.html='<p>you requested for password reset</p> <h5>Code: {} ></h5>'.format(token)
                        
            mail.send(msg)
            return jsonify({ "message": "Token sent" }), 200
        except :
            return jsonify({ "error": "Token not sent" }), 400


    def change_token(self,user_id):
        user = db.users.find_one({
            "_id": user_id
            })

        if not(pbkdf2_sha256.verify(request.json.get('password'), user['password'])):
            return jsonify({ "error": "Invalid password" }), 401

        
        try :
            auth_jira = JIRA(basic_auth=(user["email"], request.json.get('token')),options={'server': user["jira_domaine"]})

        except :
            return jsonify({ "error": "Invalid token" }), 400

        
        db.users.find_one_and_update({"_id":user_id},{'$set':{"jira_token":request.json.get('token')}})


        return jsonify({ "message": "Jira token updated" }), 200

