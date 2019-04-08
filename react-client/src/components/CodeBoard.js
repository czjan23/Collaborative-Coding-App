import React, { Component } from 'react';
import AceEditor from 'react-ace';
import Button from '@material-ui/core/Button';
import 'brace/mode/java';
import 'brace/mode/javascript';
import 'brace/mode/python';
import 'brace/theme/tomorrow';
import io from 'socket.io-client';

import store from '../store';

const socket = io.connect('http://localhost:3001/');

const defaultVals = {
  'java': 
`public class HelloWorld {
public static void main(String[] args) {
    System.out.println("Hello World!");
}
}`,
  'python': `print('hello world')`,
  'javascript': `console.log('hello world');`
};

class CodeBoard extends Component {
  constructor(props) {
    super(props);
    let language = store.getState().roomList[this.props.id].language;
    this.state = {
      language: language,
      code: defaultVals[language]
    }
  }

  componentWillMount() {
    socket.emit('enterRoom', {val: this.props.id});
    socket.on('newCode', (code) => {
      this.setState({code: code.val.val});
      // console.log(code.val.val);
    })
  }

  componentWillUnmount() {
    socket.emit('leaveRoom', {val: this.props.id});
  }

  onChange(newCode) {
    socket.emit('newCode', {val: newCode});
  }

  render() {
    return (
      <div style={{width: '100%', height: '100%'}}>
        <AceEditor
          style={{width: '100%', height: '80%'}}
          placeholder="Placeholder Text"
          mode={this.state.language}
          theme="tomorrow"
          name="blah2"
          onLoad={this.onLoad}
          onChange={this.onChange}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={this.state.code}
          setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 4,
        }}/>
      <Button variant="contained" color="primary">
        Run Your Code
      </Button>
      </div>
    );
  }
}

export default CodeBoard;