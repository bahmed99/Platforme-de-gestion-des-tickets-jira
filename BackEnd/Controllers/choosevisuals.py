
from flask import Blueprint
from flask import  g
from utils import require_login
from Services.visual import *

visuals_api = Blueprint('visuals_api', __name__)


@visuals_api.route('/SaveVisuals', methods=['POST'])
@require_login
def SaveVisual():
  return SaveVisuals(g.user["_id"])