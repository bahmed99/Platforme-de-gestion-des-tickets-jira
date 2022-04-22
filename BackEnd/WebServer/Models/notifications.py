from Models.user import User

from app import db


class Notifications(db.Document):
    id_user=db.ReferenceField(User)
    notification=db.ListField()
    date=db.DateField()
    

