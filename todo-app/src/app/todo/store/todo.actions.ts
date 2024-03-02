import { createAction, props } from "@ngrx/store";

import { Todo } from "../todo.component";

//an action is needed to reach a reducer
//as a parameter add in braces what component it belongs to, what action it invokes and a prop
const addTodo = createAction("[Todo] Add", props<Todo>());
//removetodo: the prop is an id:number as we will call the todo by its id to remove
const removeTodo = createAction("[Todo] Remove", props<{ id: number }>());
//toggleaction: change todo's state, whether its done or not
const toggleTodo = createAction("[Todo] Toggle", props<{ id: number }>());
export { addTodo, removeTodo, toggleTodo };
