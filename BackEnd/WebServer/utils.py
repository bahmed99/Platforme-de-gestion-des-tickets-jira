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
from catboost import CatBoostClassifier
import pickle
from datetime import date,datetime,timedelta
import calendar 

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


def convert_visuals(e,project,jira_domaine,id_user,jira,result):

    last_ticket=""
    if (result == {}):
        result={"Suivi des bugs":[],"Nombre de demandes par priorité":[],"Nombre total de tickets par type":[],"Ticket par priorité et par mois":[],"Ticket par statut et par client":[],"Nombre total de tickets par intervenant":[],"Analyse de la productivité":[],"Suivi des temps planifiés":[]}

    
    if(jira_domaine == ""):
        if(not(os.path.isdir('./data_files/{}'.format(id_user)))):

            if e == "Suivi des bugs":
                result["Suivi des bugs"]=(get_bugs_by_month_file(project,id_user) )   
            elif e == "Nombre de demandes par priorité":
                result["Nombre de demandes par priorité"]=(get_issues_by_priority_file(project,id_user))
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
        else:
            return jsonify({"message": False, "file": False, "user": "file"}), 200
    else :
        if e == "Suivi des bugs":
            result["Suivi des bugs"],last_ticket=(get_bugs_by_month_jira(project,jira))   
        elif e == "Nombre de demandes par priorité":
            result["Nombre de demandes par priorité"],last_ticket=(get_issues_by_priority_jira(project,jira))
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
        elif e == "Suivi des temps planifiés":
            result["Suivi des temps planifiés"],last_ticket=final_output_prediction_time_jira(project,jira)
        elif e == "Gestion des incidents":
            result["Gestion des incidents"],last_ticket=prediction_nombre_ticket(project,jira)
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
            test=True
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
    data=data[data['Clé de projet']==project][["Priorité","Création"]]
    data=get_month_creation(data)


    priorities=list(set(data['Priorité']))


    for i in priorities:
        l.append({"x":month,"y":[0,0,0,0,0,0,0,0,0,0,0,0],"name":i,"type":"bar"})
    
    for i in data.index:
        l[priorities.index(data["Priorité"][i])]['y'][data["Mois"][i]-1]+=1

    return l



def productivity_jira(project,jira):
    data=[]
    last_ticket=""
    persons=[]
    i=0
    test=False
    size = 100
    initial = 0
    while True:
        start= initial*size
        issues = jira.search_issues('project={}'.format(project), start,size)
        if len(issues) == 0:
            break
        initial += 1

        if(not test):
            last_ticket=issues[0].key.split("-")[1]
            test=True
        
        for issue in issues:
            for j in range(len(issue.fields.customfield_10050)):
                if(issue.fields.customfield_10050[j].displayName not in persons):  
                    data.append({"name":"","closed tickets":0,"all tickets":0,"remain_tickets":0,"in progress":0,"tickets with issues":0})
                    persons.append(issue.fields.customfield_10050[j].displayName)
                    data[i]["name"]=issue.fields.customfield_10050[j].displayName
   
                    i+=1

                
        for issue in issues:
            for e in data :
                for j in range(len(issue.fields.customfield_10050)):
                    if(issue.fields.customfield_10050[j].displayName==e["name"]):
                        e["all tickets"]+=1
                        if(issue.fields.status.name=='Closed' or issue.fields.status.name=='Resolved') :
                            e["closed tickets"]+=1
                        elif(issue.fields.status.name=='Open') :
                            e["in progress"]+=1
                    e["remain tickets"]=e["all tickets"]-e["closed tickets"] 
        
    return data,last_ticket
                
                    

def productivity_file(project,id_user):
    
    data=pd.read_csv("./data_files/{}/data.csv".format(id_user))
    data=data[data['Clé de projet']==project][["",""]]

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
            test=True
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
    l=data[data['Clé de projet']==project]["Type du Ticket"].value_counts().to_dict()
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
            test=True
            last_ticket=issues[0].key.split("-")[1]

        for issue in issues:
            if(issue.fields.issuetype.name == 'Bug'):  
                date=issue.fields.created.split("-")[1]
                result[month[int(date)]]+=1
    l = list(result.items())

    return result,last_ticket




def get_bugs_by_month_file(project,id_user):
    result={'Jan':0, 'Feb':0, 'Mar':0, 'Apr':0, 'May':0, 'Jun':0, 'Jul':0, 'Aug':0, 'Sep':0, 'Oct':0, 'Nov':0, 'Dec':0}

    data=pd.read_csv("./data_files/{}/data.csv".format(id_user))
    data=data[data['Clé de projet']==project][["Type","Création"]]
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
            test=True
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
    l=data[data['Clé de projet']==project]["État"].value_counts().to_dict()
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
            test=True
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
    l=data[data['Clé de projet']==project]["Rapporteur"].value_counts().to_dict()
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


def get_issues_by_priority_jira(project,jira):
    data=dict()
    last_ticket=""
    test=False
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
            test = True
            last_ticket=issues[0].key.split("-")[1]

        for issue in issues:
            
            if(issue.fields.priority.name not in priorities):  
                priorities.append(issue.fields.priority.name)
                data[issue.fields.priority.name]=0
                
        for issue in issues:
                data[issue.fields.priority.name]+=1

    return data , last_ticket


def update_issues_by_priority_jira(jira,l,last_ticket,project):
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
                    if i==issue.fields.priority.name:
                        l[i]+=1
            else :
                break
        return l          


def get_issues_by_priority_file(project,id_user):
    data=pd.read_csv("./data_files/{}/data.csv".format(id_user))
    l=data[data['Clé de projet']==project]["Priorité"].value_counts().to_dict()
    return l


def get_bugs(project,jira):
    month={1:'Jan', 2:'Feb', 3:'Mar', 4:'Apr', 5:'May', 6:'Jun', 7:'Jul', 8:'Aug', 9:'Sep', 10:'Oct', 11:'Nov', 12:'Dec'}
    d=get_bugs_by_month_jira(project,jira)[0]
    now=datetime.today()
    result={'nb_bugs':0,'pourcentage':0,'arrow':""}
    nb_bugs_last_month=d[month[now.month-1]]
    nb_bugs=d[month[now.month]]
    result['nb_bugs']=nb_bugs
    if nb_bugs_last_month!=0:
        result['pourcentage'] = round(abs(100*((nb_bugs-nb_bugs_last_month)/nb_bugs_last_month)),2)
    else :
        result['pourcentage']=0
    if nb_bugs>nb_bugs_last_month:
        result['arrow']="up"
    else :
        result['arrow'] ="down"
    return result
    

def get_projects_informations(jira,projects):
    file = open('../IA/encoderTypeTicket', 'rb')
    file_version = open('../IA/encoderTypeVersion', 'rb')
    model_cb = CatBoostClassifier(task_type='GPU', iterations=100, 
                              random_state = 2021, 
                              eval_metric="Accuracy",boost_from_average=False)
    model_participant=model_cb.load_model("../IA/participant")
    loaded_model = pickle.load(file)
    loaded_model_version = pickle.load(file_version)
    notifications=[]
    data=[]
    i=0
    for project in projects :
        nb_bug_month=0
        nb_bug_last_month=0
        print(i)
        p=jira.search_issues('project={}'.format(project), maxResults=1,json_result=True)["issues"][0]["fields"]["project"]['avatarUrls']["24x24"]
        notifications.append([])

        size = 100
        initial = 0
        test=False
        now=datetime.today()
        while True:
            
            start= initial*size
            issues = jira.search_issues('project={}'.format(project), start,size)
            if len(issues) == 0 or test:
                i+=1
                break
            initial += 1
            d=""
            version="Mineur"
            priorite=1
            type_ticket="Tâche"

            for issue in issues:
                a=int(issue.fields.created.split("-")[0])
                m=int(issue.fields.created.split("-")[1])
                j=int(issue.fields.created.split("-")[2][:2])
                d=date(a,m,j)
                if(((date(now.year,now.month,now.day)-d).days<=3 )):
                    if issue.fields.status.name!="Closed" and issue.fields.status.name!="Resolved"   :
                        if(len(issue.fields.versions)!=0):

                            v=issue.fields.versions[0].name
                        
                            
                            if(len(v.split("."))==3):
                                
                                if(v.split(".")[1]=="0" and v.split(".")[2].startswith("0")):
                                
                                    version="Majeur"
                                elif(v.split(".")[1]=="0" and not(v.split(".")[2].startswith("0"))):
                                    version="Patch"
                                elif(v.split(".")[1]!="0" and v.split(".")[2].startswith("0")):
                                    version="Mineur"

                            
                                
                            if (issue.fields.priority.name=="Trivial"):
                                priorite=1
                            elif (issue.fields.priority.name=="Minor"):
                                priorite=2
                            elif (issue.fields.priority.name=="Major"):
                                priorite=3
                            elif (issue.fields.priority.name=="Critical"):
                                priorite=4
                            elif (issue.fields.priority.name=="Blocker"):
                                priorite=5
                    
                            
                            if(issue.fields.issuetype.name=="Bug"):
                                type_ticket="Bug"
                            
                            elif(issue.fields.issuetype.name=="Task"):
                                type_ticket="Tâche"

                            elif(issue.fields.issuetype.name=="Improvement"):
                                type_ticket="Amélioration"
                                
                            elif(issue.fields.issuetype.name=="Sub-task"):
                                type_ticket="Sous-tâche"

                            elif(issue.fields.issuetype.name=="New Feature"):
                                type_ticket="Nouvelle fonctionnalité"
                           
                            elif(issue.fields.issuetype.name=="Deprecation"):
                                type_ticket="Deprecation"
                            elif(issue.fields.issuetype.name=="Epic"):
                                type_ticket="Epic"
                            elif(issue.fields.issuetype.name=="Remove Feature"):
                                type_ticket="Remove Feature"
                            elif(issue.fields.issuetype.name=="Patch"):
                                type_ticket="Patch"  

                            elif(issue.fields.issuetype.name=="Technical task"):
                                type_ticket="Technical task"
                            elif(issue.fields.issuetype.name=="Story"):
                                type_ticket="Story"  
                            
          
                        data={"Priorité":[priorite],"Type de ticket":[loaded_model.transform([type_ticket])[0]],"Jour":[j],"Mois":[m],"Annee":[a],"Nombre de Composants":[len(issue.fields.components)],"Nombre de Versions corrigées":[len(issue.fields.versions)],"Type de Version":[loaded_model_version.transform([version])[0]]}
                        df =pd.DataFrame.from_dict(data)
                        x=model_participant.predict(df)[0][0]
                        if(abs(x-len(issue.fields.customfield_10050)) ==2):
                            notifications[i].append({"img":p,"project":issue.fields.project.name,"key":issue.key,"msg":"It was provided "+str(x)+" participants given "+str(len(issue.fields.customfield_10050)),"priority":"low"})
                        elif(abs(x-len(issue.fields.customfield_10050)) ==3):
                            notifications[i].append({"img":p,"project":issue.fields.project.name,"key":issue.key,"msg":"It was provided "+str(x)+" participants given "+str(len(issue.fields.customfield_10050)),"priority":"medium"})
                        elif(abs(x-len(issue.fields.customfield_10050)) ==4):
                            notifications[i].append({"img":p,"project":issue.fields.project.name,"key":issue.key,"msg":"It was provided "+str(x)+" participants given "+str(len(issue.fields.customfield_10050)),"priority":"heigh"})
                else : 
                    test=True
                    break 
                     
            for issue in issues:
                a=int(issue.fields.created.split("-")[0])
                m=int(issue.fields.created.split("-")[1])
                j=int(issue.fields.created.split("-")[2][:2])
                d=date(a,m,j)
                if(d.year - a) * 12 + d.month - m <=1:
                    nb_bug_month+=1
                elif (d.year - a) * 12 + d.month - m ==2:
                    nb_bug_last_month+=1


    if(nb_bug_month-nb_bug_month>5):
        notifications[i].append({"project":issue.fields.project.name,"key":issue.key,"msg":"High number of bug :" +str(nb_bug_month),"priority":"low"})
    elif(nb_bug_month-nb_bug_month>10):
        notifications[i].append({"project":issue.fields.project.name,"key":issue.key,"msg":"High number of bug :" +str(nb_bug_month),"priority":"medium"})
    elif(nb_bug_month-nb_bug_month>15):
        notifications[i].append({"project":issue.fields.project.name,"key":issue.key,"msg":"High number of bug :" +str(nb_bug_month),"priority":"high"})        

    file_version.close()                
    file.close()
    return notifications



# debut prediction time 
def prediction_time(project,jira):
    data=[]
    time=[]
    #data=[{}]
    last_ticket=""
    persons=[]
    arret=False
    i=0
    test=False
    size = 100
    initial = 0
    while True:
        start= initial*size
        issues = jira.search_issues('project={}'.format(project), start,size)
        if len(issues) == 0:
            break
        initial += 1

        if(not test):
            last_ticket=issues[0].key.split("-")[1]
            test=True
        
        for issue in issues:
            if (issue.fields.resolutiondate is not None): 
                d1=datetime.strptime((issue.fields.resolutiondate.split('.'))[0],'%Y-%m-%dT%H:%M:%S')
                if (d1>datetime.today()-timedelta(50)):
                    dict={"Type de ticket":0,"Priority":0,"Nombre de participant":0,"Annee":0,"Jour":0,"Mois":0,"Nombre de Composants":0,"Nombre de Versions corrigées":0,"Type de Version":"Patch"}
                    dict["Type de ticket"]=issue.fields.issuetype.name 
                    dict["Priority"]=issue.fields.priority.name 
                    dict["Nombre de participant"]=len(issue.fields.customfield_10050)
                    dict["Annee"]=d1.year 
                    dict["Mois"]=d1.month
                    dict["Jour"]=d1.day 
                    dict["Nombre de Composants"]=len(issue.fields.components)
                    dict["Nombre de Versions corrigées"]=len(issue.fields.components)
                    if (len(issue.fields.fixVersions) != 0):
                        if (len((issue.fields.fixVersions)[0].name.split(".")) ==3):
                            if (((issue.fields.fixVersions)[0].name.split("."))[0] != 0 ):
                                dict["Type de Version"]='Majeur' 
                            elif (((issue.fields.fixVersions)[0].name.split("."))[0] == 0 and ((issues[0].fields.fixVersions)[1].name.split("."))[0] != 0):
                                dict["Type de Version"]='Mineur'
                            else :
                                dict["Type de Version"]='Patch'
                    data.append(dict)
                    d2=datetime.strptime((issue.fields.created.split('.'))[0],'%Y-%m-%dT%H:%M:%S')
                    time.append(((d1-d2).seconds/3600 + (d1-d2).days*24))
                else: 
                    arret=True
                    break   
        if (arret == True):
            break
    return data,time,last_ticket

def preparation_data(project,jira):
    hh=prediction_time(project,jira)
    for i in hh[0]:
        if(i['Type de ticket']=="Bug"):
            i['Type de ticket']="Bug"
        elif(i['Type de ticket']=="Task"):
            i['Type de ticket']="Tâche"

        elif(i['Type de ticket']=="Improvement"):
            i['Type de ticket']="Amélioration"
            
        elif(i['Type de ticket']=="Sub-task"):
            i['Type de ticket']="Sous-tâche"

        elif(i['Type de ticket']=="New Feature"):
            i['Type de ticket']="Nouvelle fonctionnalité"
        
        elif(i['Type de ticket']=="Deprecation"):
            i['Type de ticket']="Deprecation"
        elif(i['Type de ticket']=="Epic"):
            i['Type de ticket']="Epic"
        elif(i['Type de ticket']=="Remove Feature"):
            i['Type de ticket']="Remove Feature"
        elif(i['Type de ticket']=="Patch"):
            i['Type de ticket']="Patch"  

        elif(i['Type de ticket']=="Technical task"):
            i['Type de ticket']="Technical task"
        elif(i['Type de ticket']=="Story"):
            i['Type de ticket']="Story" 


    for i in hh[0]:
        if (i['Priority']=="Trivial"):
            i['Priority']=1
        elif (i['Priority']=="Minor"):
            i['Priority']=2
        elif (i['Priority']=="Major"):
            i['Priority']=3
        elif (i['Priority']=="Critical"):
            i['Priority']=4
        elif (i['Priority']=="Blocker"):
            i['Priority']=5
    
    file = open('../IA/encoderTypeTicket', 'rb')
    Type_ticket = pickle.load(file)
    file.close()
    for i in hh[0]:
        i['Type de ticket']=(Type_ticket.transform([i['Type de ticket']]))[0]   
    
    file1 = open('../IA/encoderTypeVersion', 'rb')

    Type_Version = pickle.load(file1)
    file1.close()
    for i in hh[0]:
        i['Type de Version']=(Type_Version.transform([i['Type de Version']]))[0]
    
    filehandler2 = open('../IA/time', 'rb')

    loaded_model = pickle.load(filehandler2)
    filehandler2.close()
    for i in hh[0] :
        preds=loaded_model.predict([list(i.values())])
        i["prediction"]=preds[0]
    return hh





def findDay(date): 
    born = datetime.strptime(date, '%d %m %Y').weekday() 
    return (calendar.day_name[born]) 
def final_output_prediction_time_jira(project,jira):
    hh=preparation_data(project,jira)
    L=[]
    for i in range(len(hh[0])-1):
        dict={"Jour":"Lundi", "Prediction":0 ,"real":0}
        t =findDay(str(hh[0][i]["Jour"])+' '+str(hh[0][i]["Mois"])+' '+str(hh[0][i]["Annee"]))
        dict["Jour"]= t
        dict["Prediction"] =hh[0][i]['prediction']
        dict['real']=hh[1][i]
        L.append(dict)
    
    final={"Monday":[0,0,0], "Tuesday":[0,0,0], "Wednesday":[0,0,0], "Thursday":[0,0,0],"Friday":[0,0,0], "Saturday":[0,0,0], "Sunday":[0,0,0]}
    for i in L:
        if i['Jour']=="Monday":
            final["Monday"][0] = final["Monday"][0]+i['Prediction']
            final["Monday"][1] = final["Monday"][1]+i["real"]
            final["Monday"][2] +=1 
        if i['Jour']=="Tuesday":
            final["Tuesday"][0] += i['Prediction']
            final["Tuesday"][1] += i["real"]
            final["Tuesday"][2] +=1 
        if i['Jour']=="Wednesday":
            final["Wednesday"][0] += i['Prediction']
            final["Wednesday"][1] += i["real"]
            final["Wednesday"][2] +=1 
        if i['Jour']=="Thursday":
            final["Thursday"][0] += i['Prediction']
            final["Thursday"][1] += i["real"]
            final["Thursday"][2] +=1 
        if i['Jour']=="Friday":
            final["Friday"][0] += i['Prediction']
            final["Friday"][1] += i["real"]
            final["Friday"][2] +=1 
        if i['Jour']=="Saturday":
            final["Saturday"][0] += i['Prediction']
            final["Saturday"][1] += i["real"]
            final["Saturday"][2] +=1 
        if i['Jour']=="Sunday":
            final["Sunday"][0] += i['Prediction']
            final["Sunday"][1] += i["real"]
            final["Sunday"][2] +=1 

    for i in final.keys():
        if (final[i][2] != 0):
            final[i][0]=final[i][0]/final[i][2]
            final[i][1]=final[i][1]/final[i][2]

    return final,hh[2]
# fin prediction time 


def prediction_nombre_ticket(project,jira):
    issues = jira.search_issues('project={}'.format(project), 0,1)
    last_ticket=issues[0].key.split("-")[1]
    liste=["Jan","Feb","March","Apr","Mai","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    dict={}
    today = date.today()
    k = today.month 
    while (k != 13):
        dict[liste[k-1]]=0
        k+=1 
    dict
    filehandler2 = open('../IA/ticketParMois', 'rb')

    loaded_model = pickle.load(filehandler2)
    filehandler2.close()
    # preds=loaded_model.predict([[0,today.year,today.month,today.day]])
    for j in range(len(dict.keys())):
        s =0
        for i in range(31):
            if((datetime(year=today.year, month=today.month+j, day=1)+timedelta(i)).month == today.month+j):
                s=s+abs((loaded_model.predict([[0,today.year,today.month,i]]))[0])
                s=s+(loaded_model.predict([[1,today.year,today.month,i]]))[0]
                s=s+(loaded_model.predict([[2,today.year,today.month,i]]))[0]
                s=s+(loaded_model.predict([[3,today.year,today.month,i]]))[0]
                s=s+(loaded_model.predict([[4,today.year,today.month,i]]))[0]
                s=s+(loaded_model.predict([[5,today.year,today.month,i]]))[0]
                s=s+(loaded_model.predict([[6,today.year,today.month,i]]))[0]
                s=s+(loaded_model.predict([[7,today.year,today.month,i]]))[0]
                s=s+(loaded_model.predict([[8,today.year,today.month,i]]))[0]
                s=s+(loaded_model.predict([[9,today.year,today.month,i]]))[0]
                s=s+(loaded_model.predict([[10,today.year,today.month,i]]))[0]
        dict[list(dict.keys())[j]]=int(s)
    return dict,last_ticket

def Prediction_Number_Participants(issue_type,priority,number_components,number_versions,version_type,jour,annee,mois):
    filehandler2 = open('../IA/participant', 'rb')

    loaded_model = pickle.load(filehandler2)
    filehandler2.close()

    file = open('../IA/encoderTypeTicket', 'rb')
    Type_ticket = pickle.load(file)
    file.close()

    issue_type_enc=(Type_ticket.transform([issue_type]))[0]

    file = open('../IA/encoderTypeVersion', 'rb')
    Type_version = pickle.load(file)
    file.close()

    version_type_enc=(Type_version.transform([version_type]))[0]

    return (loaded_model.predict([[issue_type_enc,int(priority),annee,jour,mois,int(number_components),int(number_versions),version_type_enc]]))[0]


def Prediction_Number_Participants(issue_type,priority,annee,jour,mois,number_components,number_versions,version_type):
    model_cb = CatBoostClassifier(task_type='GPU', iterations=100, random_state = 2021, eval_metric="Accuracy",boost_from_average=False)
    model_participant=model_cb.load_model("../IA/participant")
    
    file = open('../IA/encoderTypeTicket', 'rb')
    Type_ticket = pickle.load(file)

    issue_type_enc=(Type_ticket.transform([issue_type]))[0]

    file = open('../IA/encoderTypeVersion', 'rb')
    Type_version = pickle.load(file)

    version_type_enc=(Type_version.transform([version_type]))[0]

    return (model_participant.predict([[issue_type_enc,int(priority),int(annee),int(jour),int(mois),int(number_components),int(number_versions),version_type_enc]]))[0][0]