from flask import Flask
from flask import jsonify
from flask import request
from run_code import run_code

app = Flask(__name__)
    

@app.route('/executions', methods=['POST'])
def execute():
    req = request.get_json()
    language = req['language']
    code = req['code']
    status, result = run_code(language, code)
    return jsonify([status, result])

app.run(port=5000, debug=True)