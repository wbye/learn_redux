import React from 'react';
import {render} from 'react-dom';
import {createStore,combineReducers} from 'redux';
import {Provider,connect} from 'react-redux';

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
const mapStateToLinkProps = (state, ownProps)=> {
    return {
        active: state.currentFilter === ownProps.filter
    }
}
const mapDispatchToLinkProps = (dispatch, ownProps)=> {
    return {
        onClick: ()=> {
            dispatch(setVisibleFilter(ownProps.filter))
        }
    }
}
const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);

//class FilterLink extends React.Component {
//    componentDidMount(){
//        let {store} = this.context;
//        this.unsubscribe = store.subscribe(()=>{
//            this.forceUpdate();
//        });
//    }
//    componentWillUnmount(){
//        this.unsubscribe();
//    }
//    render(){
//        let {filter,children} = this.props;
//        let {store} = this.context;
//        let currentFilter = store.getState().currentFilter;
//
//        return (
//            <Link active={currentFilter===filter}
//                onClick={()=>{
//                    store.dispatch({
//                        type:"SET_VISIBLE_FILTER",
//                        filter:filter
//                    });
//                }}>
//                {children}
//            </Link>
//        );
//    }
//};
//FilterLink.contextTypes = {
//    store:React.PropTypes.object
//}

class FilterList extends React.Component {
    render() {
        return (
            <div>
                <FilterLink filter="SHOW_ALL">全部</FilterLink>
                <FilterLink filter='SHOW_COMPLETED'>已完成</FilterLink>
                <FilterLink filter="SHOW_UNCOMPLETED">未完成</FilterLink>
            </div>
        );
    }
}

let todoId = 0;
const addTodo = (value) =>({
    name:value,
    type:"ADD_TODO"
})
const toggleTodo = (id) =>({
    id,
    type: "TOGGLE_TODO"
})
const removeTodo = (id) =>({
    id,
    type:"REMOVE_TODO"
})
const setVisibleFilter = (filter) =>({
    type: "SET_VISIBLE_FILTER",
    filter: filter
})

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
const CurrentFilter = (state = 'SHOW_ALL', action = {})=> {
    switch (action.type) {
        case "SET_VISIBLE_FILTER":
            return action.filter;
        default :
            return state;
    }
}

const TodoAppReducer = combineReducers({
    todos: TodosReducer,
    currentFilter: CurrentFilter
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


let TodoHeader = ({
    onClick,
    text
}) => {
    let input;

    return (
        <div>
            <input ref={(node)=>{
         input = node;
        }}/>
            <Button onClick={()=>{
                onClick(input.value);
                input.value='';
            }}>添加{text}</Button>
        </div>
    );
}

const mapDispatchToHeaderProps = (dispatch)=>({
    onClick:(value)=>{
        dispatch(addTodo(value));
    }
})
const  mapStateToHeaderProps =(state)=>({
    text:"todo"
})
TodoHeader = connect(mapStateToHeaderProps,mapDispatchToHeaderProps)(TodoHeader);
//const  TodoHeader = ()=>{
//
//};

//TodoHeader.contextTypes = {
//    store: React.PropTypes.object
//}

const TodoItem = ({
    name,
    completed,
    id,
    onClickText,
    onClickDelete
    }) => {
    return <li onClick={()=>{
        onClickText(id);
    }} style={{textDecoration:completed?'line-through':'none'}}>
        {name}
        <Button onClick={()=>{
            onClickDelete(id);
        }}>删除</Button>
    </li>;
};

const TodoList = ({
    todos,
    onClickText,
    onClickDelete
    }) => {
    return (
        <ul>{
            todos.map(todo=> {
                return <TodoItem key={todo.id} {...todo} onClickDelete={onClickDelete} onClickText={onClickText}/>;
            })
        }</ul>
    );
};

const getFilterTodos = (todos, filter)=> {
    switch (filter) {
        case "SHOW_ALL":
            return [...todos];
        case "SHOW_COMPLETED":
            return todos.filter((t)=> {
                return t.completed;
            });
        case "SHOW_UNCOMPLETED":
            return todos.filter((t)=> {
                return !t.completed;
            });
        default :
            return todos;
    }
};

const mapStateToTodoListProps = (state) => {
    return {
        todos: getFilterTodos(
            state.todos,
            state.currentFilter
        )
    }
};

const mapDispatchToTodoListProps = (dispatch)=> ({
    onClickText: (id)=> {
        dispatch(toggleTodo(id));
    },
    onClickDelete: (id)=> {
        dispatch(removeTodo(id));
    }
});

//const mapDispatchToProps = (dispatch) => {
//    return {
//        onHandleCLicK:(id)=>{
//            dispatch({
//                type:"TOGGLE_TODO",
//                id
//            })
//        }
//    }
//};

const FilterTodoList = connect(mapStateToTodoListProps, mapDispatchToTodoListProps)(TodoList);
//class FilterTodoList extends React.Component{
//    componentDidMount(){
//        let {store} = this.context;
//
//        this.unsubscribe = store.subscribe(()=>{
//            this.forceUpdate();
//        })
//    }
//    componentWillUnmount(){
//        this.unsubscribe();
//    }
//    render(){
//        let {store} = this.context;
//        let state = store.getState();
//        let todos = getFilterTodos(state.todos,state.currentFilter);
//
//        return (
//            <TodoList todos={todos} />
//        );
//    }
//}

//FilterTodoList.contextTypes = {
//    store:React.PropTypes.object
//}

class TodoApp extends React.Component {
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

//class Provider extends React.Component{
//    getChildContext(){
//        return {
//            store:this.props.store
//        };
//    }
//    render(){
//        return this.props.children;
//    }
//};
//
//Provider.childContextTypes = {
//    store:React.PropTypes.object
//}

render(
    <Provider store={createStore(TodoAppReducer)}><TodoApp /></Provider>,
    document.getElementById('root')
);