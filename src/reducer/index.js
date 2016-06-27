import TodosReducer,* as fromTodos from './todos';
import {combineReducers} from 'redux';


const TodoAppReducer = combineReducers({
    todos: TodosReducer
});

export default TodoAppReducer;


export const getFilterTodos = (state,filter) =>{
    return fromTodos.getFilterTodos(state.todos,filter);
}