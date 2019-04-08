export default function userName(state='', action) {
    if (action.type==='setUsername') {
        state = action.username;
        return state;
    } else {
        return state;
    }
}