from Models.visuals_model import Visuals
from flask import Blueprint
from flask import  g
from utils import require_login
from flask_cors import CORS,cross_origin

visuals_api = Blueprint('user_api', __name__)


@visuals_api.route('/', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def register_visuals():
  return Visuals().register_visuals()