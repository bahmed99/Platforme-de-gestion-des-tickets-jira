
from Models.user import User
from app import db


class Projects(db.Document) :

    id_user=db.ReferenceField(User)
    all_projects=db.ListField(required=True)
    selected_projects=db.ListField( required=True)
    icons=db.ListField()