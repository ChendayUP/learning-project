from flask import Blueprint, render_template

admin = Blueprint('admin', __name__, url_prefix='/admin')

@admin.route('/')
def index():
    return 'admin'

@admin.route('/users')
def user_list():
    return 'admin users'

@admin.before_app_request
def admin_before_app():
    print("2. Admin before_app_request")

@admin.before_request
def admin_before():
    print("3. Admin before_request")