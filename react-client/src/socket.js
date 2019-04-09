import io from 'socket.io-client';
import store from './store';

const socket = io.connect('http://localhost:3001/');

socket.on('setMemberList', data => {
  let memberList = data.memberList;
  store.dispatch({type: 'setMemberList', memberList: memberList});
});

export default socket;