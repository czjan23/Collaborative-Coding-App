export default function roomList(state=[], action) {
    if (action.type==='addRoom') {
        state.push(action.room);
        return state;
    } else if (action.type==='deleteRoom') {
        state.splice(action.index, 1);
        return state;
    } else if(action.type==='roomListInit') {
        state = action.rooms;
        return state;
    } else {
        return state;
    }
}