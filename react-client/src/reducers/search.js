export default function search(state='', action) {
    if (action.type==='updateSearchInput') {
        state = action.searchInput;
        return state;
    } else {
        return state;
    }
}