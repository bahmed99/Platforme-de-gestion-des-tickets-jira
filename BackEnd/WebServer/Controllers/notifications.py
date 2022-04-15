
from flask import Blueprint
from flask import  g
from utils import require_login
from Services.notifications import * 


notification_api = Blueprint('notification_api', __name__)

@notification_api.route('/', methods=['GET'])
@require_login
def get_notifications():
  return get_notifications_service(g.user["_id"],g.user["jira_domaine"],g.user["email"],g.user["jira_token"])


@notification_api.route('/', methods=['PUT'])
@require_login
def delete_notifications():
  return delete_notifications_service(g.user["_id"])