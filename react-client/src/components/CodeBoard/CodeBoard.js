import React, { Component } from 'react';
import AceEditor from 'react-ace';
import Button from '@material-ui/core/Button';
import 'brace/mode/java';
import 'brace/mode/javascript';
import 'brace/mode/python';
import 'brace/theme/tomorrow';

import store from '../../store';
import socket from '../../socket';

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

  tabCloseHandler(event) {
    event.preventDefault();
    socket.emit('leaveRoom', {room: this.props.id});
  }

  componentWillMount() {
    console.log('hell yeah');
    socket.emit('enterRoom', {room: this.props.id, member: store.getState().userName});
    socket.on('newCode', data => this.setState({code: data.code}));
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.tabCloseHandler.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.tabCloseHandler.bind(this));
    socket.emit('leaveRoom', {room: this.props.id});
  }

  onChange(newCode) {
    socket.emit('newCode', {code: newCode});
  }

  render() {
    return (
      <div style={{width: '100%', height: '100%'}}>
        <AceEditor
          style={{width: '100%', height: '95%'}}
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