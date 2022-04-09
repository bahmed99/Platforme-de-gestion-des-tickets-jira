

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
        check_visual=Visuals.objects(id_user= id_user)
        if check_visual:
            check_visual.update(visuals=request.json.get('visuals'))
            return jsonify({"message": "ok"}), 200
        else :
            visual.save()
            return jsonify({"message": "ok"}), 200

        return jsonify({"error": "Signup failed"}), 400
def GetSelectedVisuals(id_user):
        visuals = Visuals.objects.get(id_user= id_user)


        if not(visuals):
            return jsonify({ "error": "This user don't have any visual" }), 401
            
        return jsonify({"visuals": visuals["visuals"]}), 200