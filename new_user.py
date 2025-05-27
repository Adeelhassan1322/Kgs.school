# create_admin.py

from app import app, db
from models import User
from werkzeug.security import generate_password_hash

with app.app_context():
    # Check if admin already exists
    existing = User.query.filter_by(username='Adeel').first()
    if not existing:
        user = User(username='Adeel', password=generate_password_hash('Kgs@2023'))
        db.session.add(user)
        db.session.commit()
        print("✅ New user created: username='Adeel', password='Kgs@2023'")
    else:
        print("⚠️ This user already exists.")
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)