import React from 'react';
import Button from './Button';

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

export default  TodoItem;