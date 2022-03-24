

from flask import jsonify, request
from Models.visuals import Visuals

def SaveVisuals(id_user):
        visuals = {
            "id_user":id_user,   #id user mich unique 
            "visuals": request.json.get('visuals'),
            "projet":"",
            "last_ticket_id":""
        }

        # id_visual, data, visual:suivi bug
        visual = Visuals(id_user=id_user,visuals=visuals["visuals"],projet=visuals["projet"])

        if visual.save():
            return jsonify({"message": "Saved successfully"}), 200

        return jsonify({"error": "Signup failed"}), 400