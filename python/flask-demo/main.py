from flask import Flask, session, request, redirect, url_for

app = Flask(__name__)

@app.route('/')
def index():
    if 'username' in session:
        return f'Logged in as {session["username"]}'
    return 'You are not logged in'

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