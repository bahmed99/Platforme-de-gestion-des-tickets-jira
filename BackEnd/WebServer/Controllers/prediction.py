from flask import Blueprint
from flask import  g
from utils import require_login
from Services.prediction import * 

prediction_api = Blueprint('prediction_api', __name__)


@prediction_api.route('/prediction', methods=['POST'])
def Pred_participants():
    return prediction_participants()