export default function executionResult(state='', action) {
    if(action.type==='setResult') {
        state = action.result;
        return state;
    } else {
        return state;
    }
}