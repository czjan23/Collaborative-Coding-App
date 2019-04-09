import {combineReducers} from 'redux';
import roomList from './roomList';
import search from './search';
import userName from './userName';
import memberList from './memberList';
import executionResult from './executionResult';

export default combineReducers({
	roomList,
	search,
	userName,
	memberList,
	executionResult
})