from wtforms.fields import DateField
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, FloatField, SelectField
from wtforms.validators import DataRequired, Length
from datetime import date
from wtforms import SelectField, DecimalField, DateField, SubmitField
from wtforms.validators import DataRequired


class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), Length(min=3, max=50)])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')

class StudentForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    roll_no = StringField('Roll Number', validators=[DataRequired()])
    class_name = StringField('Class', validators=[DataRequired()])
    section = StringField('Section')
    gender = SelectField('Gender', choices=[('Male', 'Male'), ('Female', 'Female')])
    contact = StringField('Contact')
    submit = SubmitField('Submit')

class TeacherForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    subject = StringField('Subject', validators=[DataRequired()])
    qualification = StringField('Qualification', validators=[DataRequired()])
    contact = StringField('Contact', validators=[DataRequired()])
    submit = SubmitField('Submit')

class FeeForm(FlaskForm):
    student_name = StringField('Student Name', validators=[DataRequired()])
    class_name = StringField('Class Name', validators=[DataRequired()])
    amount = FloatField('Amount', validators=[DataRequired()])
    date = DateField('Date', validators=[DataRequired()])
    month = StringField('Month', validators=[DataRequired()])
    submit = SubmitField('Submit')

class AttendanceForm(FlaskForm):
    student_name = StringField('Student Name', validators=[DataRequired()])
    class_name = StringField('Class', validators=[DataRequired()])
    date = DateField('Date', validators=[DataRequired()])
    status = SelectField('Status', choices=[('Present', 'Present'), ('Absent', 'Absent'), ('Leave', 'Leave')], validators=[DataRequired()])
    submit = SubmitField('Submit')

class SalaryForm(FlaskForm):
    staff_name = StringField('Staff Name', validators=[DataRequired()])
    month = StringField('Month', validators=[DataRequired()])
    amount = FloatField('Amount', validators=[DataRequired()])
    status = StringField('Status', validators=[DataRequired()])
    submit = SubmitField('Submit')