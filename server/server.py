from flask import Flask
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse
import requests

app = Flask(__name__)
api = Api(app)
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

def initialize():
    # Intialize the rest api server
    api.add_resource(Athentication, "/api/authenticate")
    app.run(debug=True)

initialize()