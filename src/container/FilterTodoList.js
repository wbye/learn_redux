import TodoList from './../components/TodoList';
import {connect} from 'react-redux';
import {toggleTodo,removeTodo} from './../action/todo';
import * as fromReducer from './../reducer'

const {getFilterTodos} = fromReducer;

const mapStateToProps = (state,ownProps) => ({
    todos: getFilterTodos(
        state,
        ownProps.filter||'all'
    )
});

//const mapDispatchToProps = (dispatch)=> ({
//    onClickText: (id)=> {
//        dispatch(toggleTodo(id));
//    },
//    onClickDelete: (id)=> {
//        dispatch(removeTodo(id));
//    }
//});


const FilterTodoList = connect(
    mapStateToProps,
    //mapDispatchToProps
    {
        onClickText:toggleTodo,
        onClickDelete:removeTodo
    }
)(TodoList);

export default  FilterTodoList;