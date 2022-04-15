from flask import  jsonify, request
from datetime import date,datetime
from utils import get_projects_informations,connect_jira
from Models.projects import Projects
from Models.notifications import Notifications

def get_notifications_service(id_user,domaine,email,token):
    project=Projects.objects(id_user=id_user)

    if(project):
        project=Projects.objects.get(id_user=id_user)
        jira = connect_jira(domaine,email,token)


        notifications=Notifications.objects(id_user=id_user)

        if(notifications):
            notifications=Notifications.objects.get(id_user=id_user)
            if((date(notifications["date"].year,notifications["date"].month,notifications["date"].day)- date(datetime.today().year,datetime.today().month,datetime.today().day)).days>=1 ):
                data=get_projects_informations(jira,project["selected_projects"])
                notifications.update(date=datetime.today(),notification=data) 
                return jsonify({ "data": data }), 200   
            else :
                return jsonify({ "data": notifications["notification"] }), 200   
        else: 
            data=get_projects_informations(jira,project["selected_projects"])
            notifications=Notifications(id_user=id_user,date=datetime.today(),notification=data)

            if notifications.save():
                    return jsonify({ "data": data }), 200

    return jsonify({ "error": "error" }), 400

def delete_notifications_service(id_user):
    notifications=Notifications.objects(id_user=id_user)
    if(notifications):
        notifications=Notifications.objects.get(id_user=id_user)
        notifications.update(notification=request.json.get('data'))
        return jsonify({ "message": "done" }), 200

    return jsonify({ "error": "error" }), 400