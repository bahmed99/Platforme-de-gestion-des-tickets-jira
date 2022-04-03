
from Models.user import User
from app import db


class Projects(db.Document) :

    id_user=db.ReferenceField(User)
    all_projects=db.ListField(max_length=50, required=True)
    selected_projects=db.ListField(max_length=100, required=True)
   