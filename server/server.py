from flask import Flask
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse
import requests

app = Flask(__name__)
api = Api(app)
poid = 1
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
database = {
    "users": {
        "test": {
            "password": "test",
            "org": "ORG1",
            "role": "role2"
        },
        "abc": {
            "password" : "xyz",
            "org": "ORG2",
            "role": "role1"
        }
    },
    "orgs": {
        "ORG1": {
            "name": "organization 1"
        }
    }
}


# Authenticate username and password
class Athentication(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("username")
        parser.add_argument("password")
        args = parser.parse_args()
        username =  args['username']
        password = args['password']
        if username != None and password != None:
            print(database['users'])
            if username not in database['users']:
                return {"status":"error", "msg":"Incorrect username and password"}, 201, {'Access-Control-Allow-Origin': '*'}
            if database['users'][username]['password'] == password:
                #Call the blockchain register api
                parameters = {
                    "type": "user", 
                    "username" : username,
                    "orgName" : "USAID",
                    "role": "client",
                    "attrs":[
                        {
                            "name" : "isadmin",
                            "value": "true",
                            "ecert": True
                        }
                    ],
                    "secret":"48b8ae9a8df990399a936103ca5f0159"
                }
                resp = requests.post('http://34.95.28.214:4000/users/register', json=parameters)
                if resp.status_code == 200:
                    data = resp.json()
                    status = data['success']
                    if status:
                        token = data['token']
                        return {"status": "success", "token": token}, 201, {'Access-Control-Allow-Origin': '*'} 
        return {"status":"error", "msg":"Incorrect username and password"}, 201, {'Access-Control-Allow-Origin': '*'} 


class AthenticationTransport(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("username")
        parser.add_argument("password")
        args = parser.parse_args()
        username =  args['username']
        password = args['password']
        if username != None and password != None:
            if username not in database['users']:
                return {"status":"error", "msg":"Incorrect username and password"}, 201, {'Access-Control-Allow-Origin': '*'}
            if database['users'][username]['password'] == password:
                #Call the blockchain register api
                parameters = {
                    "type": "user", 
                    "username" : username,
                    "orgName" : "Transporter",
                    "role": "client",
                    "attrs":[
                        {
                            "name" : "isadmin",
                            "value": "true",
                            "ecert": True
                        }
                    ],
                    "secret":"c5649bb423d7793ddd6941ffa55e14ce"
                }
                resp = requests.post('http://34.95.15.17:4000/users/register', json=parameters)
                if resp.status_code == 200:
                    data = resp.json()
                    status = data['success']
                    if status:
                        token = data['token']
                        return {"status": "success", "token": token}, 201, {'Access-Control-Allow-Origin': '*'} 
        return {"status":"error", "msg":"Incorrect username and password"}, 201, {'Access-Control-Allow-Origin': '*'} 

class AthenticationWarehouse(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("username")
        parser.add_argument("password")
        args = parser.parse_args()
        username =  args['username']
        password = args['password']
        if username != None and password != None:
            if username not in database['users']:
                return {"status":"error", "msg":"Incorrect username and password"}, 201, {'Access-Control-Allow-Origin': '*'}
            if database['users'][username]['password'] == password:
                print("hello")
                #Call the blockchain register api
                parameters = {
                    "type": "user", 
                    "username" : username,
                    "orgName" : "Warehouse",
                    "role": "client",
                    "attrs":[
                        {
                            "name" : "isadmin",
                            "value": "true",
                            "ecert": True
                        }
                    ],
                    "secret":"e9031e72c63bb3acea2752a185403a7b"
                }
                resp = requests.post('http://35.203.75.224:4000/users/register', json=parameters)
                if resp.status_code == 200:
                    data = resp.json()
                    status = data['success']
                    if status:
                        token = data['token']
                        return {"status": "success", "token": token}, 201, {'Access-Control-Allow-Origin': '*'} 
        return {"status":"error", "msg":"Incorrect username and password"}, 201, {'Access-Control-Allow-Origin': '*'}  


class Registration(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("username")
        parser.add_argument("password")
        parser.add_argument("fname")
        args = parser.parse_args()
        username =  args['username']
        password = args['password']
        fname = args['fname']
        database['users'][username]={"password":password}
        print(username)
        print(database['users'])

def initialize():
    # Intialize the rest api server
    api.add_resource(Athentication, "/api/authenticate")
    api.add_resource(AthenticationTransport, "/api/authenticatetransport")
    api.add_resource(AthenticationWarehouse, "/api/authenticatewarehouse")
    api.add_resource(Registration, "/api/register")
    app.run(host='0.0.0.0')
    # app.run()

initialize()