from flask import  jsonify, request
import os
from werkzeug.utils import secure_filename

def upload_files(user_id):
    if request.files :
        os.makedirs('./data_files/{}'.format(user_id),exist_ok=True)
        file = request.files.get("file")
        file.save(os.path.join('./data_files/{}/'.format(user_id), "data.csv"))

        return jsonify({ "message": "Uploaded successfully" }), 200
    
    return jsonify({ "error": "File not found" }), 400


