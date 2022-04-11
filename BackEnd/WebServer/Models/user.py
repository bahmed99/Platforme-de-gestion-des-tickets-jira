

from app import db
from datetime import datetime


class User(db.Document) :
    name=db.StringField(max_length=50, required=True)
    email=db.StringField(max_length=50, required=True, unique=True)
    password=db.StringField(max_length=100, required=True)
    jira_token=db.StringField(max_length=50, required=True)
    jira_domaine=db.StringField(max_length=50, required=True)
    reset_token=db.StringField(max_length=500,default="")
    expire_token=db.DateField(max_length=50 ,default=datetime.now())

    def __str__(self):
        return str(self.email)
    
    def to_json(self):
        return {
            "_id": str(self.pk),
            "name": self.name,
            "email": self.email,
            "password": self.password,
            "jira_token": self.jira_token,
            "jira_domaine": self.jira_domaine,
            "expire_token":self.expire_token,
            "reset_token":self.reset_token
        }