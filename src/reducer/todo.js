import {v4} from 'node-uuid';

const TodoReducer = (state = {}, action = {})=> {
    switch (action.type) {
        case "ADD_TODO":
            return {
                name: action.name,
                completed: false,
                id: v4()
            };
        case "TOGGLE_TODO":
            if (state.id === action.id) {
                return {
                    name: state.name,
                    completed: !state.completed,
                    id: state.id,
                }
            } else {
                return state;
            }
        default:
            return state;
    }
}

export default TodoReducer;