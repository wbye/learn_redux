import TodoReducer from './../reducer/todo';

const TodosReducer = (state = [], action = {}) => {
    switch (action.type) {
        case "ADD_TODO":
            if (action.name.trim()) {
                return [...state, TodoReducer(undefined, action)];
            }
            return [...state];
        case "TOGGLE_TODO":
            return state.map(t=> {
                return TodoReducer(t, action);
            });
        case "REMOVE_TODO":
            return state.filter(t=> {
                return t.id !== action.id;
            });
        default :
            return state;
    }
}

export default  TodosReducer;