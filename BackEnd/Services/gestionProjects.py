from Models.projects import Projects
from flask import Blueprint
from flask import  g
from utils import require_login
from flask_cors import CORS,cross_origin



projects_api = Blueprint('projects_api', __name__)


@projects_api.route('/projects', methods=['GET'])
@require_login
def GetProjects():
    return Projects().GetAllProjects(g.user['jira_domaine'],g.user['email'],g.user['jira_token'])

    