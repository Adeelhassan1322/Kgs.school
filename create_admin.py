# create_admin.py

from app import app, db
from models import Admin
from werkzeug.security import generate_password_hash

with app.app_context():
    # Check if admin already exists
    existing = Admin.query.filter_by(username='admin').first()
    existing = Admin.query.filter_by(username='Adeel Hassan').first()
    if not existing:
        admin = Admin(username='admin', password=generate_password_hash('admin123'))
        admin = Admin(username='Adeel Hassan', password=generate_password_hash('Kgs@2023'))
        db.session.add(admin)
        db.session.commit()
        print("✅ Admin user created: username='admin', password='admin123'")
    else:
        print("⚠️ Admin user already exists.")
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)