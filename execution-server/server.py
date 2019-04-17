from flask import Flask
from flask import jsonify
from flask import request
import run_code

app = Flask(__name__)

@app.route('/executions', methods=['POST'])
def execute():
    req = request.get_json()
    code = req['code']
    language = req['language']
    result = run_code.build_and_run(code, language)
    if (result['build'] == 'OK'):
        return jsonify([0, result['run']])
    else:
        return jsonify([1, result['build']])

if __name__ == '__main__':
    run_code.load_image()
    app.run(debug=True)