import React from 'react';
import FilterLink from './../container/FilterLink';

class FilterList extends React.Component {
    render() {
        return (
            <div>
                <FilterLink filter="all">全部</FilterLink>
                <FilterLink filter='complete'>已完成</FilterLink>
                <FilterLink filter="uncomplete">未完成</FilterLink>
            </div>
        );
    }
}

export default  FilterList;