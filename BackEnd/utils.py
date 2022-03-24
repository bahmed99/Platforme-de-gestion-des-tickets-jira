from flask import jsonify, request, g
import jwt
from functools import wraps
from config import *
from Models.user import User


def require_login(func):
    @wraps(func)
    def decorated(*args, **kwargs):

        token = request.headers["Authorization"]

        if not token:
            return jsonify({'Alert!': 'Token is missing!'}), 401

        try:
            id = jwt.decode(token, secret_key, algorithms=["HS256"])

        except:
            return jsonify({'Error': 'Invalid token'}), 403

        user = User.objects.get(id=id["user"])

        if not(user):
            return jsonify({'error': 'Invalid token'}), 401


        g.user = user.to_json()
        return func(*args, **kwargs)

    return decorated
