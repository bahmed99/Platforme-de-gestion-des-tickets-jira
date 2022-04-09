from xml import dom
from flask import jsonify, request, g
import jwt
from functools import wraps
from config import *
from Models.user import User
from jira.client import JIRA
import pandas as pd
from datetime import datetime
import requests
from requests.auth import HTTPBasicAuth
import json

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


def connect_jira(domaine,email,token):
    options = {'server': domaine}
    jira = JIRA(options, basic_auth=(email, token))
    return jira



def get_issues_by_priority_month_jira(project,jira):
    l=[]
    last_ticket=""
    test=False
    month=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    priorities=[]
    size = 100
    initial = 0

    
    while True:
        start= initial*size
        issues = jira.search_issues('project={}'.format(project),  start,size)
        if len(issues) == 0:
            break
        initial += 1

        if(not test):
            last_ticket=issues[0].key.split("-")[1]

        for issue in issues:
            data={"x":month,"y":[0,0,0,0,0,0,0,0,0,0,0,0],"name":"","type":"bar"}
            if(issue.fields.priority.name not in priorities):  
                priorities.append(issue.fields.priority.name)
                data["name"]=issue.fields.priority.name
                l.append(data)
                
        for issue in issues:
                date=issue.fields.created.split("-")[1]
                l[priorities.index(issue.fields.priority.name)]['y'][int(date)-1]+=1

    return l,last_ticket


def get_issues_by_priority_month_file(project,id_user):
    l=[]
    month=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    

    data=pd.read_csv("./data_files/{}/data.csv".format(id_user))
    data=data[data['Nom du projet']==project][["Priorité","Création"]]
    data=get_month_creation(data)


    priorities=list(set(data['Priorité']))


    for i in priorities:
        l.append({"x":month,"y":[0,0,0,0,0,0,0,0,0,0,0,0],"name":i,"type":"bar"})
    
    for i in data.index:
        l[priorities.index(data["Priorité"][i])]['y'][data["Mois"][i]-1]+=1

    return l


def get_issues_by_status_jira(project,jira):
    data=dict()
    last_ticket=""
    test=False
    status=[]
    size = 100
    initial = 0
    while True:
        start= initial*size
        issues = jira.search_issues('project={}'.format(project),  start,size)
        if len(issues) == 0:
            break
        initial += 1

        if(not test):
            last_ticket=issues[0].key.split("-")[1]

        for issue in issues:
            
            if(issue.fields.status.name not in status):  
                status.append(issue.fields.status.name)
                data[issue.fields.status.name]=0
                
        for issue in issues:
                data[issue.fields.status.name]+=1

    return data , last_ticket


def get_issues_by_status_file(project,id_user):
    data=pd.read_csv("./data_files/{}/data.csv".format(id_user))
    l=data[data['Nom du projet']==project]["État"].value_counts().to_dict()
    return l
    

def check_last_ticket(jira,last_ticket,project):
    issues = jira.search_issues('project={}'.format(project),0,1)

    if(int(issues[0].key.split("-")[1])<=int(last_ticket)):  
        return False,last_ticket
    
    return True,issues[0].key.split("-")[1]


def update_issues_by_priority_month_jira(jira,l,last_ticket,project):

        size = 100
        initial = 0
        while True:
            start= initial*size
            issues = jira.search_issues('project={}'.format(project),  start,size)
            if len(issues) == 0:
                break
            initial += 1

            for issue in issues:
                if(int(issue.key.split("-")[1])>int(last_ticket)):
                    for i in l:
                        if i["name"]==issue.fields.priority.name:
                            date=issue.fields.created.split("-")[1]
                            i["y"][int(date)-1]+=1
                else :
                    break
        return l          


def update_issues_by_status_jira(jira,l,last_ticket,project):
        size = 100
        initial = 0
        while True:
            start= initial*size
            issues = jira.search_issues('project={}'.format(project),  start,size)
            if len(issues) == 0:
                break
            initial += 1

            for issue in issues:
                if(int(issue.key.split("-")[1])>int(last_ticket)):
                    for i in l.keys():
                        if i==issue.fields.status.name:
                            l[i]+=1
                else :
                    break
        return l          


def get_issues_by_creator_jira(project,jira):
    data=dict()
    last_ticket=""
    test=False
    creators=[]
    size = 100
    initial = 0
    while True:
        start= initial*size
        issues = jira.search_issues('project={}'.format(project),  start,size)
        if len(issues) == 0:
            break
        initial += 1

        if(not test):
            last_ticket=issues[0].key.split("-")[1]

        for issue in issues:
            
            if(issue.fields.creator.displayName not in creators):  
                creators.append(issue.fields.creator.displayName)
                data[issue.fields.creator.displayName]=0
                
        for issue in issues:
                data[issue.fields.creator.displayName]+=1

    return data , last_ticket

def get_issues_by_creator_file(project,id_user):
    data=pd.read_csv("./data_files/{}/data.csv".format(id_user))
    l=data[data['Nom du projet']==project]["Rapporteur"].value_counts().to_dict()
    return l

def update_issues_by_creator_jira(jira,l,last_ticket,project):
        size = 100
        initial = 0
        while True:
            start= initial*size
            issues = jira.search_issues('project={}'.format(project),  start,size)
            if len(issues) == 0:
                break
            initial += 1

            for issue in issues:
                if(int(issue.key.split("-")[1])>int(last_ticket)):
                    for i in l.keys():
                        if i==issue.fields.creator.displayName:
                            l[i]+=1
                else :
                    break
        return l      



def transform_date(D):
    if (D.find("déc") != -1):
        A=D.replace("déc",'Dec')
    elif (D.find("nov" )!= -1):
        A=D.replace("nov",'Nov')
    elif (D.find("oct" )!= -1):
        A=D.replace("oct",'Oct')
    elif (D.find("sept" )!= -1):
        A=D.replace("sept",'Sep')
    elif (D.find("août" )!= -1):
        A=D.replace("août",'Aug')
    elif (D.find("juil")!= -1):
        A=D.replace("juil",'Jul')
    elif (D.find("juin") != -1):
        A=D.replace("juin",'Jun')
    elif (D.find("mai" )!= -1):
        A=D.replace("mai",'May')
    elif (D.find("avr")!= -1):
        A=D.replace("avr",'Apr')
    elif (D.find("mars")!= -1):
        A=D.replace("mars",'Mar')
    elif (D.find("févr" )!= -1):
        A=D.replace("févr",'Feb')
    elif (D.find("janv" )!= -1):
        A=D.replace("janv",'Jan')
 
    return A

def get_month_creation(data) :

    for i in data['Création'].index:
        if pd.isna(data['Création'][i])==False:
            data['Création'][i]=transform_date(data['Création'][i])


    for i in data['Création'].index:
        if pd.isna(data['Création'][i])==False:
            if (data['Création'][i].find(".") != -1):
                data['Création'][i]=data['Création'][i].replace(".",'')

    data['Mois']=-1


    for i in data['Mois'].index:
        if pd.isna(data['Création'][i])==False:
            d1=datetime.strptime(data['Création'][i],'%d/%b/%Y %H:%M %p')
            data['Mois'][i]=d1.month

    return data


def getIconProject(project,domaine,token,email):
    

    url = "{}rest/api/3/project/{}".format(domaine,project)

    auth = HTTPBasicAuth(email, token)

    headers = {
    "Accept": "application/json"
    }

    response = requests.request(
    "GET",
    url,
    headers=headers,
    auth=auth
    )

    return json.loads(response.text)
