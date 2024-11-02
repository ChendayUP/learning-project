from flask import Flask, session, request, redirect, url_for
from admin import admin
app = Flask(__name__)

# 注册蓝图
app.register_blueprint(admin, url_prefix='/admin')

@app.before_request
def app_before():
    print("1. App before_request")

@app.route('/')
def index():
    print(session)
    if 'username' in session:
        return f'Logged in as {session["username"]}'
    return 'You are not logged in'

@app.route('/request', methods=['GET', 'POST'])
def request_info():
    request_info = {
        'url': request.url,
        'base_url': request.base_url,
        'host': request.host,
        'host_url': request.host_url,
        'path': request.path,
        'full_path': request.full_path,
        'query_string': request.query_string,
        'method': request.method,
        'scheme': request.scheme,
        'remote_addr': request.remote_addr,
        'remote_user': request.remote_user,
        'user_agent': request.user_agent.string,
        'cookies': dict(request.cookies),
        'headers': dict(request.headers),
        'form': dict(request.form),
        'args': dict(request.args),
        'values': dict(request.values),
        # 'json': request.json,
        'data': request.data,
        'files': request.files
    }
    if 'json' in request:
        request_info['json'] = request
    else:
        print('json not in request')

    return '<br>'.join([f'{k}: {v}' for k, v in request_info.items()])

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        print(session)
        print(request.form)
        print('username', request.form['username'])
        session['username'] = request.form['username']
        return redirect(url_for('index'))
    return '''
        <form method="post">
            <p><input type=text name=username></p>
            <p><input type=submit value=Login></p>
        </form>
    '''

@app.route('/hello')
def hello():
    return 'Hello, World!'

@app.route('/hello/<name>/')
def hello_name(name):
    return f'Hello, {name}!'

@app.route('/hello/<name>/<int:age>')
def hello_name_age(name, age):
    return f'Hello, {name}! You are {age} years old.'


if __name__ == "__main__":
    app.run(debug=True);