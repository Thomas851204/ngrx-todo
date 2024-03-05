//role of reducer: handle the logic based on the action it receives.
import { Todo } from "../todo.component";
import { createReducer, on } from "@ngrx/store";
import {
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
} from "./todo.actions";

// state type that has the variables(?) we want to have in the store
//here to TodoState type has 1 property: an array of todos
//A Todo is an type with 3 properties: id, name, done

//Add properties to the TodoState type:isloading and error
export type TodoState = {
  todos: Todo[];
  isLoading: boolean;
  error: string;
};

//the initial state of our app: it has an empty array (no need for specifying the todos, it will automatically become Todo)
//isLoading is false by default, and error is empty
export const initialState: TodoState = {
  todos: [],
  isLoading: false,
  error: ""
};

//create a reducer(s)

//this reducer is to create a new state based on the action it receives.

const todoStore = createReducer(
  initialState,
  //getTodos
  on(getTodoStarted, (state) => ({ ...state, isLoading: true })),
  on(getTodoSuccess, (state, { todos }) => ({
    ...state,
    todos,
    isLoading: false
  })),
  on(getTodoError, (state, { message }) => ({ ...state, error: message, isLoading: false })),

  //addTodo
  on(addTodoStarted, (state) => ({ ...state, isLoading: true })), //change state with a new state object, where the isloaindg prop is true
  on(addTodoSuccess, (state, { id, name, done }) => ({
    ...state,
    todos: [...state.todos, { id, name, done }],
    isLoading: false
  })),
  on(addTodoError, (state, { message }) => ({ ...state, error: message, isLoading: false })),

  //removeTodo
  on(removeTodoStarted, (state) => ({ ...state, isLoading: true })),
  on(removeTodoSuccess, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((todo) => id !== todo.id),
    isLoading: false
  })),
  on(removeTodoError, (state, { message }) => ({ ...state, error: message, isLoading: false })),

  //toggleTodo: toggle whether the todo on the list is done or not.
  on(toggleTodoStarted, (state) => ({ ...state, isLoading: true })),
  on(toggleTodoSuccess, (state, { id, done }) => ({
    ...state,
    todos: state.todos.map((todo) => (todo.id === id ? { ...todo, done } : todo)),
    isLoading: false
  })),
  on(toggleTodoError, (state, { message }) => ({ ...state, error: message, isLoading: false }))
);

export { todoStore };
