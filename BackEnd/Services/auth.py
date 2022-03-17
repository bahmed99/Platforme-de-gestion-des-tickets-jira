from Models.user import User
from flask import Blueprint
from flask import  g
from utils import require_login


user_api = Blueprint('user_api', __name__)

@user_api.route('/signup', methods=['POST'])
def signup():
  return User().signup()


@user_api.route('/login', methods=['POST'])
def login():
  return User().login()

@user_api.route('/forgot-password', methods=['POST'])
def login():
  return User().forgot_password()


@user_api.route('/new-password', methods=['POST'])
def login():
  return User().new_password()


@user_api.route('/', methods=['GET'])
@require_login
def Test():
  return "g.user"


