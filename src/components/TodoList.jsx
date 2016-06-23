import React from 'react';
import TodoItem from './TodoItem';

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

export default  TodoList;