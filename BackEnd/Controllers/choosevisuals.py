
from flask import Blueprint
from flask import  g
from utils import require_login
from Services.visual import *

visuals_api = Blueprint('visuals_api', __name__)


@visuals_api.route('/SaveVisuals', methods=['PATCH'])
@require_login
def SaveVisual():
  return SaveVisuals(g.user["_id"])


@visuals_api.route('/GetSaveVisuals', methods=['GET'])
@require_login
def GetSaveVisual():
  return GetSelectedVisuals(g.user["_id"])

@visuals_api.route('/GetData', methods=['POST'])
@require_login
def GetResult():
  return GetData(g.user["_id"],g.user['jira_domaine'],g.user['email'],g.user['jira_token']) 

