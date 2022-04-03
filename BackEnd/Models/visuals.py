from Models.user import User

from app import db


class Visuals(db.Document):
    id_user=db.ReferenceField(User)
    visuals=db.ListField(required=True)
    projet=db.StringField(max_length=100)
    last_ticket_id=db.StringField(max_length=100)



   