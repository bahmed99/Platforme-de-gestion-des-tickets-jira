from Models.user import User
from flask import Blueprint
from flask import  g
from utils import require_login
from flask_cors import CORS,cross_origin

user_api = Blueprint('user_api', __name__)


@user_api.route('/signup', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def signup():
  return User().signup()


@user_api.route('/login', methods=['POST'])
def login():
  return User().login()

@user_api.route('/forgot-password', methods=['POST'])
def forgot_password():
  return User().forgot_password()


@user_api.route('/new-password', methods=['POST'])
def reset_password():
  return User().new_password()


@user_api.route('/', methods=['GET'])
@require_login
def Test():
  return "g.user"


