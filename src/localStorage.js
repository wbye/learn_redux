export const loadState = ()=>{
    try{
       let serializedState = localStorage.getItem("state");

        if(serializedState===null){
            return undefined;
        }
        return JSON.parse(serializedState);
    }catch(e){
        return undefined;
    }
}

export const saveState = (state)=>{
    try{
        let serializedState = JSON.stringify(state);

        localStorage.setItem("state",serializedState);
    }catch(e){
    }
}
