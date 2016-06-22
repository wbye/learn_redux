import React from 'react';
import {render} from 'react-dom';
import createStore from 'redux/lib/createStore';
import {Image,NormalImage,ReplaceImage} from './components/image';

const person = (state = 'nobody',action ={})=>{
    switch (action.type){
        case "ADD_PERSON":
            return action.name;
        default :
            return state;
    }
}

const persons = (state = [] ,action ={} ) =>{
    switch (action.type){
        case "ADD_PERSON":
            if(action.name.trim()&&state.indexOf(action.name)===-1){
                return [
                    ...state,
                    person(undefined,action)
                ];
            }
            return [...state];
        case "REMOVE_PERSON":
            return state.filter(n=>{
                return n!==action.name;
            });
        default :
            return state;
    }
}

const personStore = createStore(persons);

const personStore2 = createStore(persons);

console.log(personStore === personStore2);


const Button = ({
    children,
    onClick
}) => {
    return <button onClick={onClick}>{children}</button>;
}

const AddHeader = ({
    store
}) => {
    let input;

    return (
        <div>
            <input ref={node =>{
                input = node;
            }} />
            <Button onClick={()=>{
                 store.dispatch({
                    name:input.value,
                    type:"ADD_PERSON"
                 });
                 input.value ='';
            }}>添加</Button>
        </div>
    );
}

class TableTr extends React.Component{
    render(){
        let tr;
        let props = this.props;

        return (
            <tr>
                <td>
                    {props.name}
                </td>
                <td>
                    <Button onClick={()=>{
                        props.store.dispatch({
                            type:"REMOVE_PERSON",
                            name:props.name
                        })
                    }}>删除</Button>
                </td>
            </tr>
        );
    }
}

class TableTrs extends React.Component{
    componentDidMount(){
        this.unsubscribe = this.props.store.subscribe(()=>{
            this.forceUpdate();
        });
    }
    componentWillUnMount(){
        this.unsubscribe();
    }
    render(){
        let names = this.props.store.getState();

        return (
            <table>
                <tbody>{
                    names.map(name=> {
                        return <TableTr store={this.props.store} key={name} name={name}/>;
                    })
                }
                </tbody>
            </table>
        );
    }
}

const TableApp = ({
    store
}) => {
    return (
        <div>
            <AddHeader store={store}/>
            <TableTrs store={store}/>
        </div>
    );
}

render(
    <TableApp store={personStore} />,
    document.getElementById('root')
);

render(
    <TableApp store={personStore2}/>,
    document.getElementById('root2')
);

render(
    <Image src="http://r2.ykimg.com/051500005769F1DD67BC3D4F7B0A407E" />,
    document.getElementById('root3')
);

render(
    <NormalImage src="http://r2.ykimg.com/051500005769F1DD67BC3D4F7B0A407E" width="200px" height="200px"/>,
    document.getElementById('root4')
);

render(
    <ReplaceImage src="https://cscdn.maxleap.cn/2.0/download/NTY3MTNiYTFhNWZmN2YwMDAxYjM5ZDdj/zcf-28da58e2-f5a8-4116-a6c0-072223ec6aa2.png" width="200px" height="200px" />,
    document.getElementById('root5')
);