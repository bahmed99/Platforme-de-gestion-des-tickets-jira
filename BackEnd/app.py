from flask import Flask
from flask_cors import CORS,cross_origin
from flask_restful import Api
from flask_mail import Mail

from utils import *

app = Flask(__name__)



cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


db=ConnexionBD()

mail_settings = {
    "MAIL_SERVER": 'smtp.gmail.com',
    "MAIL_PORT": 465,
    "MAIL_USE_TLS": False,
    "MAIL_USE_SSL": True,
    "MAIL_USERNAME": "idrivegears@gmail.com",
    "MAIL_PASSWORD": "aok2020."
}

app.config.update(mail_settings)
mail = Mail(app)


from Services.auth import user_api

from Services.gestionProjects import projects_api
api = Api(app)

app.register_blueprint(user_api, url_prefix='/user')
app.register_blueprint(projects_api, url_prefix='/projects')

from Services.upload_file import file_api



app.register_blueprint(file_api, url_prefix='/file')



@app.route('/', methods=['GET'])
def hello():
  return "It works"


# import requests
# from requests.auth import HTTPBasicAuth
# import json
# @app.route('/allprojects', methods=['GET'])
# def Salut():
#   url = "https://oussama-kordoghli99.atlassian.net/rest/api/3/project"

#   auth = HTTPBasicAuth("oussama.kordoghli@ensi-uma.tn", "XYJ4FaLRi8amFclMq5es78FB")

#   headers = {
#     "Accept": "application/json"
#   }

#   response = requests.request(
#     "GET",
#     url,
#     headers=headers,
#     auth=auth
#   )
#   return str(json.dumps(json.loads(response.text), sort_keys=True, indent=4, separators=(",", ": ")))

  

if __name__ == "__main__":
    app.run(debug=True)

