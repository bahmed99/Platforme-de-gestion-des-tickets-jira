from unittest import result
import array
from xml import dom
from flask import jsonify, request, g
import jwt
from functools import wraps
from config import *
from Models.user import User
import os
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

def convert_visuals(visuals,project,jira_domaine,id_user,jira):
    result={"Suivi des bugs":[],"Nombre de demandes par priorité":[],"Nombre total de tickets par type":[],"Ticket par priorité et par mois":[],"Ticket par statut et par client":[],"Nombre total de tickets par intervenant":[],"Analyse de la productivité":[]}
    if(jira_domaine == ""):
        if(not(os.path.isdir('./data_files/{}'.format(id_user)))):
            for e in visuals : 
                if e == "Suivi des bugs":
                    result["Suivi des bugs"]=(get_bugs_by_month_file(project,id_user) )   
                elif e == "Nombre de demandes par priorité":
                    result["Nombre de demandes par priorité"]=(get_issues_by_priority_month_file(project,id_user))
                elif e == "Nombre total de tickets par type":
                    result["Nombre total de tickets par type"]=(get_issues_by_type_file(project,id_user))
                elif e == "Ticket par priorité et par mois":
                    result["Ticket par priorité et par mois"]=(get_issues_by_priority_month_file(project,id_user))
                elif e == "Ticket par statut et par client":
                    result["Ticket par statut et par client"]=(get_issues_by_status_file(project,id_user))
                elif e == "Nombre total de tickets par intervenant":
                    result["Nombre total de tickets par intervenant"]=(get_issues_by_creator_file(project,id_user))
                elif e == "Analyse de la productivité":
                    result["Analyse de la productivité"]=(productivity_file(project,id_user))
            return jsonify({"message": True, "file": True}), 200
        else:
            return jsonify({"message": False, "file": False, "user": "file"}), 200
    else :
        for e in visuals : 
            if e == "Suivi des bugs":
                result["Suivi des bugs"],last_ticket=(get_bugs_by_month_jira(project,jira))   
            elif e == "Nombre de demandes par priorité":
                result["Nombre de demandes par priorité"],last_ticket=(get_issues_by_priority_month_jira(project,jira))
            elif e == "Nombre total de tickets par type":
                result["Nombre total de tickets par type"],last_ticket=(get_issues_by_type_jira(project,jira))
            elif e == "Ticket par priorité et par mois":
                result["Ticket par priorité et par mois"],last_ticket=(get_issues_by_priority_month_jira(project,jira))
            elif e == "Ticket par statut et par client":
                result["Ticket par statut et par client"],last_ticket=(get_issues_by_status_jira(project,jira))
            elif e == "Nombre total de tickets par intervenant":
                result["Nombre total de tickets par intervenant"],last_ticket=(get_issues_by_creator_jira(project,jira))
            elif e == "Analyse de la productivité":
                result["Analyse de la productivité"],last_ticket=productivity_jira(project,jira)
        return result,last_ticket

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



#productivité : nom, nb ticket thalou, nb total, nb ticket mezelou,resolution(eli mathalouch)
def productivity_jira(project,jira):
    data=[{"name":"","closed tickets":0,"all tickets":0,"remain_tickets":0,"in progress":0,"tickets with issues":0}]
    #data=[{}]
    last_ticket=""
    persons=[]
    i=0
    test=False
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
            for j in range(len(issue.fields.customfield_10050)):
                if(issue.fields.customfield_10050[j].displayName not in persons):  
                    persons.append(issue.fields.customfield_10050[j].displayName)
                    data[i]["name"]=issue.fields.customfield_10050[j].displayName
                    data[i]["all tickets"]=0
                    data[i]["in progress"]=0
                    data[i]["closed tickets"]=0
                    data[i]["remain tickets"]=0
                    data[i]["tickets with issues"]=0
        i+=1

                
        for issue in issues:
            for e in data :
                for j in range(len(issue.fields.customfield_10050)):
                    if(issue.fields.customfield_10050[j].displayName==e["name"]):
                        e["all tickets"]+=1
                        if(issue.fields.status.name=='closed') :
                            e["closed tickets"]+=1
                        elif(issue.fields.status.name=='in progress') :
                            e["in progress"]+=1
                        #elif(eli andhom mochkla fel resolution)
                            #e["tickets with issues"]+=1
                    e["remain tickets"]=e["all tickets"]-e["closed tickets"] #neksa tickets with issues
        
    return data,last_ticket
                
                    

def productivity_file(project,id_user):
    
    data=pd.read_csv("./data_files/{}/data.csv".format(id_user))
    data=data[data['Nom du projet']==project][["",""]]

    return 1


def get_issues_by_type_jira(project,jira):
    data=dict()
    last_ticket=""
    test=False
    types=[]
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
            
            if(issue.fields.issuetype.name not in types):  
                types.append(issue.fields.issuetype.name)
                data[issue.fields.issuetype.name]=0
                
        for issue in issues:
                data[issue.fields.issuetype.name]+=1

    return data , last_ticket




def get_issues_by_type_file(project,id_user):
    data=pd.read_csv("./data_files/{}/data.csv".format(id_user))
    l=data[data['Nom du projet']==project]["Type du Ticket"].value_counts().to_dict()
    return l




def get_bugs_by_month_jira(project,jira):
    result={'Jan':0, 'Feb':0, 'Mar':0, 'Apr':0, 'May':0, 'Jun':0, 'Jul':0, 'Aug':0, 'Sep':0, 'Oct':0, 'Nov':0, 'Dec':0}
    month={1:'Jan', 2:'Feb', 3:'Mar', 4:'Apr', 5:'May', 6:'Jun', 7:'Jul', 8:'Aug', 9:'Sep', 10:'Oct', 11:'Nov', 12:'Dec'}
    last_ticket=""
    test=False
    bugs=[]
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
            if(issue.fields.issuetype.name == 'Bug'):  
                bugs.append(issue)
                
        for bug in bugs:
                date=bug.fields.created.split("-")[1]
                result[month[int(date)]]+=1
    l = list(result.items())

    return result,last_ticket




def get_bugs_by_month_file(project,id_user):
    result={'Jan':0, 'Feb':0, 'Mar':0, 'Apr':0, 'May':0, 'Jun':0, 'Jul':0, 'Aug':0, 'Sep':0, 'Oct':0, 'Nov':0, 'Dec':0}

    data=pd.read_csv("./data_files/{}/data.csv".format(id_user))
    data=data[data['Nom du projet']==project][["Type","Création"]]
    data=get_month_creation(data)

    
    for i in data :
        if data['Type'] == 'Bug':
            result[data['Création']]+=1
    return result

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

def update_bugs_by_month_jira(jira,l,last_ticket,project):
    month={1:'Jan', 2:'Feb', 3:'Mar', 4:'Apr', 5:'May', 6:'Jun', 7:'Jul', 8:'Aug', 9:'Sep', 10:'Oct', 11:'Nov', 12:'Dec'}
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
                        date = issue.fields.created.split("-")[1]
                        if i==month[int(date)]:
                            l[i]+=1
                else :
                    break
    return l 

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
