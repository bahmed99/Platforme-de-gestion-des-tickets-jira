
from flask import Blueprint
from flask import  g
from utils import require_login
from Services.upload_file import * 


file_api = Blueprint('file_api', __name__)

@file_api.route('/', methods=['POST'])
@require_login
def upload_file():
  return upload_files(g.user["_id"])