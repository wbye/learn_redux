import React from 'react';
import {render} from 'react-dom';
import {createStore,combineReducers} from 'redux';

const Button = ({
    children,
    onClick
    }) => {
    return <button onClick={onClick}>{children}</button>;
}

const Link = ({
    active,
    children,
    onClick
    }) => {
    if (active) {
        return <span>{children}</span>;
    }
    return <a href="javascript:void(0);" onClick={onClick}>{children}</a>
}

class FilterLink extends React.Component {
    render() {
        let props = this.props;

        return <Link {...props}></Link>;
    }
}

class FilterList extends React.Component {
    render(){
        let currentFilter = todoStore.getState().currentFilter;


        return (
            <div>
                <FilterLink active={currentFilter==='SHOW_ALL'}  onClick={()=>{
                    todoStore.dispatch({
                        type:"SET_VISIBLE_FILTER",
                        filter:"SHOW_ALL"
                    });
                }}>全部</FilterLink>
                <FilterLink active={currentFilter==='SHOW_COMPLETED'} onClick={()=>{
                    todoStore.dispatch({
                        type:"SET_VISIBLE_FILTER",
                        filter:"SHOW_COMPLETED"
                    });
                }}>已完成</FilterLink>
                <FilterLink active={currentFilter==='SHOW_UNCOMPLETED'} onClick={()=>{
                    todoStore.dispatch({
                        type:"SET_VISIBLE_FILTER",
                        filter:"SHOW_UNCOMPLETED"
                    });
                }}>未完成</FilterLink>
            </div>
        );
    }
}

let todoId = 0;

const TodoReducer = (state = {}, action = {})=> {
    switch (action.type) {
        case "ADD_TODO":
            return {
                name: action.name,
                completed: false,
                id: todoId++
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
const CurrentFilter = (state = 'SHOW_ALL',action = {})=>{
    switch (action.type){
        case "SET_VISIBLE_FILTER":
            return action.filter;
        default :
            return state;
    }
}

const TodoAppReducer = combineReducers({
    todos:TodosReducer,
    currentFilter:CurrentFilter
})
//const TodoAppReducer = (state = {
//    todos: [],
//    currentFilter:'SHOW_ALL'
//}, action = {}) => {
//    switch (action.type) {
//        case "ADD_TODO":
//            return {
//                todos: TodosReducer(state.todos, action),
//                currentFilter:CurrentFilter(state.currentFilter,action)
//            };
//        case "REMOVE_TODO":
//            return {
//                todos: TodosReducer(state.todos, action),
//                currentFilter:CurrentFilter(state.currentFilter,action)
//            };
//        case "TOGGLE_TODO":
//            return {
//                todos: TodosReducer(state.todos, action),
//                currentFilter:CurrentFilter(state.currentFilter,action)
//            };
//        case "SET_VISIBLE_FILTER":
//            return {
//                todos: TodosReducer(state.todos, action),
//                currentFilter:CurrentFilter(state.currentFilter,action)
//            };
//        default:
//            return state;
//    }
//}

const TodoHeader = ({}) => {
    let input;

    return (
        <div>
            <input ref={(node)=>{
         input = node;
        }}/>
            <Button onClick={()=>{
                todoStore.dispatch({
                    name:input.value,
                    type:"ADD_TODO"
                });
                input.value='';
            }}>添加</Button>
        </div>
    );
}
const TodoItem = ({
    name,
    completed,
    id
    }) => {
    return <li onClick={()=>{
        todoStore.dispatch({
            id:id,
            type:"TOGGLE_TODO"
        })
    }} style={{textDecoration:completed?'line-through':'none'}}>
        {name}
        <Button onClick={()=>{
           todoStore.dispatch({
                id:id,
                type:"REMOVE_TODO"
            })
        }}>删除</Button>
    </li>;
};

const TodoList = ({
    todos
}) => {
    return (
        <ul>{
            todos.map(todo=> {
                return <TodoItem key={todo.id} {...todo} />;
            })
        }</ul>
    );
};

const FilterTodoList =({}) =>{
    const FilterTodos= (todos,filter)=>{
        switch (filter){
            case "SHOW_ALL":
                return [...todos];
            case "SHOW_COMPLETED":
                return todos.filter((t)=>{
                    return t.completed;
                });
            case "SHOW_UNCOMPLETED":
                return todos.filter((t)=>{
                    return !t.completed;
                });
            default :
                return todos;
        }
    }
    let state = todoStore.getState();
    let filter = state.currentFilter;
    let todos = FilterTodos(state.todos,filter);

    return (
        <TodoList todos={todos} />
    );
}

class TodoApp extends React.Component {
    componentDidMount() {
        this.unsubscribe = todoStore.subscribe(()=> {
            this.forceUpdate();
        });
    }

    componentWillUnMount() {
        this.unsubscribe();
    }

    render() {
        return (
            <div>
                <TodoHeader />
                <FilterTodoList  />
                <FilterList />
            </div>
        );
    }
}
const todoStore = createStore(TodoAppReducer);

render(
    <TodoApp />,
    document.getElementById('root')
);