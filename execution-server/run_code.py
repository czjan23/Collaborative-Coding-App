import subprocess
import os

def run_code(language, code):
    if language == 'java':
        status, result = run_java(code)
        return status, result
    elif language == 'javascript':
        status, result = run_javascript(code)
        return status, result
    else:
        status, result = run_python(code)
        return status, result

def run_python(code):
    with open('temp.py', 'w') as f:
        f.write(code)
    status = 0
    result = ''
    with open('output.txt', 'w') as out, open('error.txt', 'w') as err:
        status = subprocess.run(["python", "temp.py"], stdout=out, stderr=err).returncode
    with open('output.txt', 'r') as out, open('error.txt', 'r') as err:
        if (status == 0):
            result = out.read()
        else:
            result = err.read()
    os.remove("temp.py")
    os.remove("output.txt")
    os.remove("error.txt")
    return status, result

def run_javascript(code):
    with open('temp.js', 'w') as f:
        f.write(code)
    status = 0
    result = ''
    with open('output.txt', 'w') as out, open('error.txt', 'w') as err:
        status = subprocess.run(["node", "temp.js"], stdout=out, stderr=err).returncode
    with open('output.txt', 'r') as out, open('error.txt', 'r') as err:
        if (status == 0):
            result = out.read()
        else:
            result = err.read()
    os.remove("temp.js")
    os.remove("output.txt")
    os.remove("error.txt")
    return status, result

def run_java(code):
    with open('Solution.java', 'w') as f:
        f.write(code)
    status = 0
    result = ''
    with open('compile_out.txt', 'w') as out, open('compile_err.txt', 'w') as err:
        status = subprocess.run(["javac", "Solution.java"], stdout=out, stderr=err).returncode
    if status == 1:
        with open('compile_err.txt', 'r') as err:
            result = err.read()
        os.remove("compile_out.txt")
        os.remove("compile_err.txt")
        return status, result
    with open('output.txt', 'w') as out, open('error.txt', 'w') as err:
        status = subprocess.run(["java", "Solution"], stdout=out, stderr=err).returncode
    with open('output.txt', 'r') as out, open('error.txt', 'r') as err:
        if (status == 0):
            result = out.read()
        else:
            result = err.read()
    os.remove("Solution.java")
    os.remove("Solution.class")
    os.remove("output.txt")
    os.remove("error.txt")
    os.remove("compile_out.txt")
    os.remove("compile_err.txt")
    return status, result