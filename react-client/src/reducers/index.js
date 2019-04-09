import {combineReducers} from 'redux';
import roomList from './roomList';
import search from './search';
import userName from './userName';
import memberList from './memberList';

export default combineReducers({
	roomList,
	search,
	userName,
	memberList
})