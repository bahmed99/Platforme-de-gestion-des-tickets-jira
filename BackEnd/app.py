from flask import Flask
from flask_cors import CORS
from flask_restful import Api

from utils import *

app = Flask(__name__)


CORS(app, resources={r"/*": {"origins": "*"}})


db=ConnexionBD()


from Services.auth import user_api
api = Api(app)
app.register_blueprint(user_api, url_prefix='/user')


@app.route('/', methods=['GET'])
def hello():
  return "It works"

if __name__ == "__main__":
    app.run(debug=True)

