import TodosReducer from './todos';
import {combineReducers} from 'redux';

const TodoAppReducer = combineReducers({
    todos: TodosReducer
});

export default TodoAppReducer;