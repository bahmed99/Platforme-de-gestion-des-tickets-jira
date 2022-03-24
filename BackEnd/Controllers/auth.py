from flask import Blueprint
from flask import  g
from utils import require_login
from flask_cors import CORS,cross_origin
from Services.auth import *


user_api = Blueprint('user_api', __name__)


@user_api.route('/signup', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def signup():
   return signup_service()


@user_api.route('/login', methods=['POST'])
def login():
    return login_service()

@user_api.route('/forgot-password', methods=['POST'])
def forgot_password():
   return forgot_password_service()


@user_api.route('/new-password', methods=['POST'])
def reset_password():
   return new_password_service()

@user_api.route('/change-password', methods=['POST'])
@require_login
def change_password():
   return change_password_service(g.user["email"])



@user_api.route('/', methods=['GET'])
@require_login
def Test():
  print(g.user)
  return'f'
  


