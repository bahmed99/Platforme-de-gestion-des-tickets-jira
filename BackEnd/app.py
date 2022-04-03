from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from flask_mail import Mail
from flask_mongoengine import MongoEngine



app = Flask(__name__)

db = MongoEngine(app)

app.config['MONGODB_SETTINGS'] = {
	'db': 'pcd'
}


cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


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


from Controllers.auth import user_api
from Controllers.choosevisuals import visuals_api

from Controllers.gestionProjects import projects_api
api = Api(app)

app.register_blueprint(user_api, url_prefix='/user')
app.register_blueprint(projects_api, url_prefix='/projects')

app.register_blueprint(visuals_api,url_prefix='/visuals')

from Controllers.upload_file import file_api



app.register_blueprint(file_api, url_prefix='/file')



@app.route('/', methods=['GET'])
def hello():
  
  return "It works"



if __name__ == "__main__":
    app.run(threaded=True ,host="0.0.0.0", port=8080)

