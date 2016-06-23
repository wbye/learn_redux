import {createStore} from 'redux';
import TodoAppReducer from './reducer';
import {loadState,saveState} from './localStorage';
import throttle from 'lodash/throttle';

const  configureStore = () =>{
    const perisistedState = loadState();
    const store = createStore(TodoAppReducer, perisistedState);

    store.subscribe(throttle(
            ()=> {
                saveState({
                    todos: store.getState().todos
                })
            },
            1000)
    );

    return store;
}

export default configureStore;