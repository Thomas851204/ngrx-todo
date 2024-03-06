import { createAction, props } from "@ngrx/store";

import { Todo } from "../todo.component";

//an action is needed to reach a reducer
//specify/export types that we want to add to the actions as props
//as a parameter of the createAction method, add in braces what component it belongs to, what action it invokes and a prop(if needed). The prop is the data the action will carry as a payload (like the body of a HTTP request)

//get stored data from backend on load
export type GetTodoResponse = { todos: Todo[] };
export type GetTodoError = { message: string };

const getTodoStarted = createAction("[Todo Get] Started");
const getTodoSuccess = createAction("[Todo Get] Success", props<GetTodoResponse>());
const getTodoError = createAction("[Todo Get] Error", props<GetTodoError>());

//add new todos
export type AddTodoRequest = { name: string; done: boolean };
export type AddTodoResponse = { id: number; name: string; done: boolean };
export type AddTodoError = { message: string };

const addTodoStarted = createAction("[Todo Add] Started", props<AddTodoRequest>());
const addTodoSuccess = createAction("[Todo Add] Success", props<AddTodoResponse>());
const addTodoError = createAction("[Todo Add] Error", props<AddTodoError>());

//removetodo: the prop is an id:number as we will call the todo by its id to remove
export type RemoveTodoRequest = { id: number };
export type RemoveTodoResponse = { id: number };
export type RemoveTodoError = { message: string };

const removeTodoStarted = createAction("[Todo Remove] Started", props<RemoveTodoRequest>());
const removeTodoSuccess = createAction("[Todo Remove] Success", props<RemoveTodoResponse>());
const removeTodoError = createAction("[Todo Remove] Error", props<RemoveTodoError>());

//toggleaction: change todo's state, whether its done or not
export type ToggleTodoRequest = { id: number; done: boolean };
export type ToggleTodoResponse = { id: number; done: boolean };
export type ToggleTodoError = { message: string };

const toggleTodoStarted = createAction("[Todo Toggle] Started", props<ToggleTodoRequest>());
const toggleTodoSuccess = createAction("[Todo Toggle] Success", props<ToggleTodoResponse>());
const toggleTodoError = createAction("[Todo Toggle] Error", props<ToggleTodoError>());

export {
  addTodoStarted,
  addTodoSuccess,
  addTodoError,
  removeTodoStarted,
  removeTodoSuccess,
  removeTodoError,
  toggleTodoStarted,
  toggleTodoSuccess,
  toggleTodoError,
  getTodoStarted,
  getTodoSuccess,
  getTodoError
};
