from flask import Flask
from models.user import db, User
import config

def create_app():
    app = Flask(__name__)
    app.config.from_object(config)

    # Initialize the database
    db.init_app(app)

    with app.app_context():
        db.create_all()  # Create database tables

    return app