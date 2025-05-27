from flask import Flask, render_template, redirect, url_for, flash, request
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from werkzeug.security import check_password_hash
from flask_login import current_user

from models import db, Admin, Student, Teacher, Fee, Attendance, Salary
from forms import LoginForm, StudentForm, TeacherForm, FeeForm, AttendanceForm, SalaryForm
from datetime import datetime
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///kgs.db'

db.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'
@app.route('/students')
@login_required
def view_students():
    students = Student.query.all()
    return render_template('students/view_students.html', students=students, user=current_user)

@app.route('/students/add', methods=['GET', 'POST'])
@login_required
def add_student():
    form = StudentForm()
    if form.validate_on_submit():
        new_student = Student(
            name=form.name.data,
            roll_no=form.roll_no.data,
            class_name=form.class_name.data,
            section=form.section.data,
            gender=form.gender.data,
            contact=form.contact.data
        )
        db.session.add(new_student)
        db.session.commit()
        flash('Student added successfully!', 'success')
        return redirect(url_for('view_students'))
    return render_template('students/add_student.html', form=form, )

@app.route('/students/edit/<int:student_id>', methods=['GET', 'POST'])
@login_required
def edit_student(student_id):
    student = Student.query.get_or_404(student_id)
    form = StudentForm(obj=student)
    if form.validate_on_submit():
        student.name = form.name.data
        student.roll_no = form.roll_no.data
        student.class_name = form.class_name.data
        student.section = form.section.data
        student.gender = form.gender.data
        student.contact = form.contact.data
        db.session.commit()
        flash('Student updated successfully!', 'success')
        return redirect(url_for('view_students'))
    return render_template('students/edit_student.html', form=form, user=current_user)

@app.route('/students/delete/<int:student_id>')
@login_required
def delete_student(student_id):
    student = Student.query.get_or_404(student_id)
    db.session.delete(student)
    db.session.commit()
    flash('Student deleted successfully!', 'success')
    return redirect(url_for('view_students'))
@app.route('/teachers')
@login_required
def view_teachers():
    teachers = Teacher.query.all()
    return render_template('teachers/view_teachers.html', teachers=teachers, user=current_user)

@app.route('/teachers/add', methods=['GET', 'POST'])
@login_required
def add_teacher():
    form = TeacherForm()
    if form.validate_on_submit():
        new_teacher = Teacher(
            name=form.name.data,
            subject=form.subject.data,
            qualification=form.qualification.data,
            contact=form.contact.data
        )
        db.session.add(new_teacher)
        db.session.commit()
        flash('Teacher added successfully!', 'success')
        return redirect(url_for('view_teachers'))
    return render_template('teachers/add_teacher.html', form=form, user=current_user)

@app.route('/teachers/edit/<int:teacher_id>', methods=['GET', 'POST'])
@login_required
def edit_teacher(teacher_id):
    teacher = Teacher.query.get_or_404(teacher_id)
    form = TeacherForm(obj=teacher)
    if form.validate_on_submit():
        teacher.name = form.name.data
        teacher.subject = form.subject.data
        teacher.qualification = form.qualification.data
        teacher.contact = form.contact.data
        db.session.commit()
        flash('Teacher updated successfully!', 'success')
        return redirect(url_for('view_teachers'))
    return render_template('teachers/edit_teacher.html', form=form, user=current_user)

@app.route('/teachers/delete/<int:teacher_id>')
@login_required
def delete_teacher(teacher_id):
    teacher = Teacher.query.get_or_404(teacher_id)
    db.session.delete(teacher)
    db.session.commit()
    flash('Teacher deleted successfully!', 'success')
    return redirect(url_for('view_teachers'))

@login_manager.user_loader
def load_user(user_id):
    return Admin.query.get(int(user_id))
    
@app.route('/fees')
@login_required
def view_fees():
    fees = Fee.query.all()
    for fee in fees:
        if isinstance(fee.date, str):
            fee.date = datetime.strptime(fee.date, '%Y-%m-%d')
    return render_template('fees/view_fees.html', fees=fees, user=current_user)

@app.route('/fees/add', methods=['GET', 'POST'])
@login_required
def add_fee():
    form = FeeForm()
    if form.validate_on_submit():
        new_fee = Fee(
            student_name=form.student_name.data,
            class_name=form.class_name.data,
            amount=form.amount.data,
            month=form.month.data,
            date=form.date.data
        )
        db.session.add(new_fee)
        db.session.commit()
        flash('Fee record added successfully!', 'success')
        return redirect(url_for('view_fees'))
    return render_template('fees/add_fee.html', form=form, user=current_user)
@app.route('/salary')
@login_required
def view_salary():
    salaries = Salary.query.all()
    return render_template('salary/view_salary.html', salaries=salaries, user=current_user)

@app.route('/salary/add', methods=['GET', 'POST'])
@login_required
def add_salary():
    form = SalaryForm()
    if form.validate_on_submit():
        new_salary = Salary(
            staff_name=form.staff_name.data,
            month=form.month.data,
            amount=form.amount.data,
            status=form.status.data
        )
        db.session.add(new_salary)
        db.session.commit()
        flash('Salary record added successfully!', 'success')
        return redirect(url_for('view_salary'))
    return render_template('salary/add_salary.html', form=form, user=current_user)

@app.route('/salary/edit/<int:salary_id>', methods=['GET', 'POST'])
@login_required
def edit_salary(salary_id):
    salary = Salary.query.get_or_404(salary_id)
    form = SalaryForm(obj=salary)
    if form.validate_on_submit():
        salary.staff_name = form.staff_name.data
        salary.month = form.month.data
        salary.amount = form.amount.data
        salary.status = form.status.data
        db.session.commit()
        flash('Salary record updated successfully!', 'success')
        return redirect(url_for('view_salary'))
    return render_template('salary/edit_salary.html', form=form, user=current_user)

@app.route('/salary/delete/<int:salary_id>')
@login_required
def delete_salary(salary_id):
    salary = Salary.query.get_or_404(salary_id)
    db.session.delete(salary)
    db.session.commit()
    flash('Salary record deleted successfully!', 'success')
    return redirect(url_for('view_salary'))

@app.route('/attendance')
@login_required
def view_attendance():
    attendances = Attendance.query.order_by(Attendance.date.desc()).all()
    return render_template('attendance/view_attendance.html', attendances=attendances, user=current_user)

@app.route('/attendance/add', methods=['GET', 'POST'])
@login_required
def add_attendance():
    form = AttendanceForm()
    if form.validate_on_submit():
        new_attendance = Attendance(
            student_name=form.student_name.data,
            class_name=form.class_name.data,
            date=form.date.data,
            status=form.status.data
        )
        db.session.add(new_attendance)
        db.session.commit()
        flash('Attendance record added successfully!', 'success')
        return redirect(url_for('view_attendance'))
    return render_template('attendance/add_attendance.html', form=form, user=current_user)

@app.route('/attendance/edit/<int:attendance_id>', methods=['GET', 'POST'])
@login_required
def edit_attendance(attendance_id):
    attendance = Attendance.query.get_or_404(attendance_id)
    form = AttendanceForm(obj=attendance)
    if form.validate_on_submit():
        attendance.student_name = form.student_name.data
        attendance.class_name = form.class_name.data
        attendance.date = form.date.data
        attendance.status = form.status.data
        db.session.commit()
        flash('Attendance record updated successfully!', 'success')
        return redirect(url_for('view_attendance'))
    return render_template('attendance/edit_attendance.html', form=form, user=current_user)

@app.route('/attendance/delete/<int:attendance_id>')
@login_required
def delete_attendance(attendance_id):
    attendance = Attendance.query.get_or_404(attendance_id)
    db.session.delete(attendance)
    db.session.commit()
    flash('Attendance record deleted successfully!', 'success')
    return redirect(url_for('view_attendance'))


@app.route('/fees/edit/<int:fee_id>', methods=['GET', 'POST'])
@login_required
def edit_fee(fee_id):
    fee = Fee.query.get_or_404(fee_id)
    form = FeeForm(obj=fee)
    if form.validate_on_submit():
        fee.student_name = form.student_name.data
        fee.class_name = form.class_name.data
        fee.amount = form.amount.data
        fee.date = form.date.data
        fee.month = form.month.data
        db.session.commit()
        flash('Fee record updated successfully!', 'success')
        return redirect(url_for('view_fees'))
    return render_template('fees/edit_fee.html', form=form, user=current_user)

@app.route('/fees/delete/<int:fee_id>')
@login_required
def delete_fee(fee_id):
    fee = Fee.query.get_or_404(fee_id)
    db.session.delete(fee)
    db.session.commit()
    flash('Fee record deleted successfully!', 'success')
    return redirect(url_for('view_fees'))


@app.route('/')
def home():
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        admin = Admin.query.filter_by(username=form.username.data).first()
        if admin and check_password_hash(admin.password, form.password.data):
            login_user(admin)
            return redirect(url_for('index'))
        flash('Invalid username or password')
    return render_template('login.html', form=form, hide_navbar=True)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

@app.route('/dashboard')
@login_required
def dashboard():
    total_students = Student.query.count()
    total_teachers = Teacher.query.count()
    total_fees = Fee.query.count()
    return render_template('dashboard.html',
                           total_students=total_students,
                           total_teachers=total_teachers,
                           total_fees=total_fees ,user=current_user)
                           
@app.route('/index')
@login_required
def index():
    total_students = Student.query.count()
    total_teachers = Teacher.query.count()
    total_fees = Fee.query.count()
    return render_template('index.html', user=current_user)


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
