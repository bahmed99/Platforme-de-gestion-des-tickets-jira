
from flask import  jsonify, request
from passlib.hash import pbkdf2_sha256
from jira.client import JIRA
from Models.user import User
from Models.projects import Projects
import jwt
from utils import secret_key
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from datetime import timedelta,datetime
from flask_mail import Message
from app import mail

def signup_service():
            user = {
                "name": request.json.get('name'),
                "email": request.json.get('email'),
                "password": request.json.get('password'),
                "jira_token":request.json.get('token'),
                "jira_domaine":request.json.get('domaine'),
                "reset_token":"",
                "expire_token":""
                }

        
            user['password'] = pbkdf2_sha256.encrypt(user['password'])

            user_save=User(name=user["name"],email=user["email"],password=user["password"],jira_token=user["jira_token"],jira_domaine=user["jira_domaine"])

            check_user=User.objects(email=user["email"])

            if check_user:
                return jsonify({ "error": "Email address already in use" }), 400
            

            if(user["jira_token"]!="" and user["jira_domaine"]!=""):

                try :
                    auth_jira = JIRA(basic_auth=(user["email"], user["jira_token"]),options={'server': user["jira_domaine"]})

                except :

                    return jsonify({ "error": "Invalid signup credentials" }), 400

            if user_save.save():
                return jsonify({ "message": "Saved successfully" }), 200
            
            User.drop_indexes() 

            return jsonify({ "error": "Signup failed" }), 400


def login_service():
    # print(User.list_indexes())
    print(request.json.get('email'))
    user=User.objects.get(email=request.json.get('email'))
    
    

    if not(user):
        return jsonify({ "error": "Invalid email" }), 401  

    if not(pbkdf2_sha256.verify(request.json.get('password'), user.password)):
        return jsonify({ "error": "Invalid password" }), 401 

    
    token = jwt.encode({'user': str(user.id)},secret_key)      
    

    return jsonify({"token": token}), 200   


def forgot_password_service():
        user=User.objects.get(email=request.json.get('email'))
        print(user.email)


        if not(user):
            return jsonify({ "error": "Invalid email" }), 401  


        token = Serializer(secret_key, 360000)
        token=token.dumps({'user_email':user.email}).decode('utf-8')

       

        user.update(reset_token=token,expire_token=datetime.now())
        
        try:

            msg = Message(subject="Hello",
                        sender="idrivegears@gmail.com",
                        recipients=user.email.split())
            msg.html='<p>you requested for password reset</p> <h5> click on this <a href="http://localhost:3000/reset/{}"> Link </a> to reset your password</h5>'.format(token)
                        
            mail.send(msg)
            return jsonify({ "message": "Token sent" }), 200
        except :
            return jsonify({ "error": "Token not sent" }), 400


def new_password_service():
        token= request.json.get('token')
        password=request.json.get('password')

        user = User.objects.get(
        reset_token= token,
        expire_token__gte=datetime.now())
        

        

        if not(user):
            return jsonify({ "error": "Session expired" }), 401

        
        user.update(password=pbkdf2_sha256.encrypt(password) ,reset_token="",expire_token=datetime.now())

        return jsonify({ "message": "Password updated" }), 201


def change_password_service(user_email):
    user=User.objects.get(email=user_email)


    if not(pbkdf2_sha256.verify(request.json.get('oldPassword'), user.password)):
        return jsonify({ "error": "Invalid password" }), 401 
    
    user.update(password=pbkdf2_sha256.encrypt(request.json.get('newPassword')))

    return jsonify({ "message": "Password updated" }), 201

    


def change_domaine_service(user_email,id_user):
        user=User.objects.get(email=user_email)

        if not(pbkdf2_sha256.verify(request.json.get('password'), user.password)):
            return jsonify({ "error": "Invalid password" }), 401

        
        try :
            auth_jira = JIRA(basic_auth=(user.email, request.json.get('token')),options={'server': request.json.get('domaine')})

        except :
            return jsonify({ "error": "Invalid token" }), 400
        
        
        if(user.jira_domaine!=request.json.get('domaine')):
            project=Projects.objects.get(id_user=id_user)
            project.delete()

        
        user.update(jira_token=request.json.get('token'),jira_domaine=request.json.get('domaine'))


        return jsonify({ "message": "Jira token updated" }), 200


def get_username_service(username):
    return username

def get_user_service(user):
    return jsonify({ "user": user }), 201