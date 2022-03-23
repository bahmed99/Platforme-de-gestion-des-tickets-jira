from Models.visuals import Visuals
from flask import Blueprint
from flask import  g
from utils import require_login
from flask_cors import CORS,cross_origin

visuals_api = Blueprint('visuals_api', __name__)


@visuals_api.route('/SaveVisuals', methods=['POST'])
@require_login
def SaveVisuals():
  return Visuals().SaveVisuals(g.user["_id"])