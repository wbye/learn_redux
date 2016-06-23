import React from 'react';
import TodoHeader from './TodoHeader';
import FilterTodoList from './../container/FilterTodoList';
import FilterList from './FilterList';

class TodoApp extends React.Component {
    render() {
        let {params} = this.props;

        return (
            <div>
                <TodoHeader />
                <FilterTodoList  filter={params.filter||'all'} />
                <FilterList />
            </div>
        );
    }
}

export default  TodoApp;