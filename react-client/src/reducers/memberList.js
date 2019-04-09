export default function memberList(state=[], action) {
    if(action.type==='setMemberList') {
        state = action.memberList;
        return state;
    } else {
        return state;
    }
}