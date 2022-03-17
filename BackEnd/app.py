from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from flask_mail import Mail

from utils import *

app = Flask(__name__)


CORS(app, resources={r"/*": {"origins": "*"}})


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
api = Api(app)

app.register_blueprint(user_api, url_prefix='/user')


@app.route('/', methods=['GET'])
def hello():
  return "It works"

  

if __name__ == "__main__":
    app.run(debug=True)

