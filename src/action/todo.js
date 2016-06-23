export const addTodo = (value) =>({
    name:value,
    type:"ADD_TODO"
});
export const toggleTodo = (id) =>({
    id,
    type: "TOGGLE_TODO"
});
export const removeTodo = (id) =>({
    id,
    type:"REMOVE_TODO"
});
