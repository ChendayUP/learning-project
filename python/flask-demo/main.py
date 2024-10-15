from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World2!'

@app.route('/hello')
def hello():
    return 'Hello, World!'

@app.route('/hello/<name>/')
def hello_name(name):
    return f'Hello, {name}!'

@app.route('/hello/<name>/<int:age>')
def hello_name_age(name, age):
    return f'Hello, {name}! You are {age} years old.'