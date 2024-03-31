import { createAction, props } from "@ngrx/store";
import { Todo } from "../todo.component";

export type LoadTodosResponse = { todos: Todo[] };
export type LoadTodosError = { message: string };

const loadTodosStarted = createAction("[Todo Load] Started");
const loadTodosSuccess = createAction("[Todo Load] Success", props<LoadTodosResponse>());
const loadTodosError = createAction("[Todo Load] Error", props<LoadTodosError>());

export type AddTodoRequest = { name: string; done: boolean };
export type AddTodoResponse = { id: number; name: string; done: boolean };
export type AddTodoError = { message: string };

const addTodoStarted = createAction("[Todo Add] Started", props<AddTodoRequest>());
const addTodoSuccess = createAction("[Todo Add] Success", props<AddTodoResponse>());
const addTodoError = createAction("[Todo Add] Error", props<AddTodoError>());

export type RemoveTodoRequest = { id: number };
export type RemoveTodoResponse = { id: number };
export type RemoveTodoError = { message: string };

const removeTodoStarted = createAction("[Todo Remove] Started", props<RemoveTodoRequest>());
const removeTodoSuccess = createAction("[Todo Remove] Success", props<RemoveTodoResponse>());
const removeTodoError = createAction("[Todo Remove] Error", props<RemoveTodoError>());

export type ToggleTodoRequest = { id: number; name: string; done: boolean };
export type ToggleTodoResponse = { id: number; name: string; done: boolean };
export type ToggleTodoError = { message: string };

const toggleTodoStarted = createAction("[Todo Toggle] Started", props<ToggleTodoRequest>());
const toggleTodoSuccess = createAction("[Todo Toggle] Success", props<ToggleTodoResponse>());
const toggleTodoError = createAction("[Todo Toggle] Error", props<ToggleTodoError>());

export {
  loadTodosStarted,
  loadTodosSuccess,
  loadTodosError,
  addTodoStarted,
  addTodoSuccess,
  addTodoError,
  removeTodoStarted,
  removeTodoSuccess,
  removeTodoError,
  toggleTodoStarted,
  toggleTodoSuccess,
  toggleTodoError
};
