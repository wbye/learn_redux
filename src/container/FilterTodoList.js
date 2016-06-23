import TodoList from './../components/TodoList';
import {connect} from 'react-redux';
import {toggleTodo,removeTodo} from './../action/todo';

const getFilterTodos = (todos, filter)=> {
    switch (filter) {
        case "all":
            return [...todos];
        case "complete":
            return todos.filter((t)=> {
                return t.completed;
            });
        case "uncomplete":
            return todos.filter((t)=> {
                return !t.completed;
            });
        default :
            return todos;
    }
};

const mapStateToProps = (state,ownProps) => ({
    todos: getFilterTodos(
        state.todos,
        ownProps.filter
    )
});

const mapDispatchToProps = (dispatch)=> ({
    onClickText: (id)=> {
        dispatch(toggleTodo(id));
    },
    onClickDelete: (id)=> {
        dispatch(removeTodo(id));
    }
});


const FilterTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default  FilterTodoList;