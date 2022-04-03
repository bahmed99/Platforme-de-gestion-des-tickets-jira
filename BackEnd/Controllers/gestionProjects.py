from Models.projects import Projects
from flask import Blueprint
from flask import  g
from utils import require_login
from Services.project import *




projects_api = Blueprint('projects_api', __name__)


@projects_api.route('/projects', methods=['GET'])
@require_login
def GetProjects():
    return GetAllProjects(g.user['jira_domaine'],g.user['email'],g.user['jira_token'])

@projects_api.route('/SaveProjects', methods=['POST'])
@require_login
def SaveProjects():
    return Saveprojects(g.user["_id"])

@projects_api.route('/GetReponse', methods=['GET'])
@require_login
def GetAnswer():
    return GetReponse(g.user["_id"],g.user["jira_domaine"])

@projects_api.route('/GetSelectedProjects', methods=['GET'])
@require_login
def SelectedProject():
    return GetSelectedProjects(g.user["_id"])


@projects_api.route('/UpdateProjects', methods=['PUT'])
@require_login
def UpdateSelectedProject():
    return Updateprojects(g.user["_id"])


  

@projects_api.route('/GetProjectsFromFile', methods=['GET'])
@require_login
def GetProjectFromFile():
    return GetProject(g.user["_id"])  

