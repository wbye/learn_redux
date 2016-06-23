import React from 'react';
import Button from './../components/Button';
import {addTodo} from './../action/todo';
import {connect} from 'react-redux';

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

const mapDispatchToProps = (dispatch)=>({
    onClick:(value)=>{
        dispatch(addTodo(value));
    }
});

const  mapStateToProps =(state)=>({
    text:"todo"
});

TodoHeader = connect(mapStateToProps,mapDispatchToProps)(TodoHeader);

export default TodoHeader;