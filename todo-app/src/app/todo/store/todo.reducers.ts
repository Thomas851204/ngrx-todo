import { createReducer, on } from "@ngrx/store";
import { Todo } from "../todo.component";
import {
  loadTodosStarted,
  loadTodosError,
  loadTodosSuccess,
  addTodoError,
  addTodoStarted,
  addTodoSuccess,
  removeTodoError,
  removeTodoStarted,
  removeTodoSuccess,
  toggleTodoError,
  toggleTodoStarted,
  toggleTodoSuccess
} from "./todo.actions";

export type TodoState = {
  todos: Todo[];
  isLoading: boolean;
  error: string;
};

const initialState: TodoState = {
  todos: [],
  error: "",
  isLoading: false
};

const todoStore = createReducer(
  initialState,

  // loadTodos
  on(loadTodosStarted, (state) => ({ ...state, isLoading: true })),
  on(loadTodosSuccess, (state, { todos }) => ({
    ...state,
    isLoading: false,
    todos
  })),
  on(loadTodosError, (state, { message }) => ({ ...state, isLoading: false, error: message })),

  // addTodo
  on(addTodoStarted, (state) => ({ ...state, isLoading: true })),
  on(addTodoSuccess, (state, { id, name, done }) => ({
    ...state,
    isLoading: false,
    todos: [...state.todos, { id, name, done }]
  })),
  on(addTodoError, (state, { message }) => ({ ...state, isLoading: false, error: message })),

  // removeTodo
  on(removeTodoStarted, (state) => ({ ...state, isLoading: true })),
  on(removeTodoSuccess, (state, { id }) => ({
    ...state,
    isLoading: false,
    todos: state.todos.filter((todo) => todo.id !== id)
  })),
  on(removeTodoError, (state, { message }) => ({ ...state, isLoading: false, error: message })),

  // toggleTodo
  on(toggleTodoStarted, (state) => ({ ...state, isLoading: true })),
  on(toggleTodoSuccess, (state, { id, name, done }) => ({
    ...state,
    isLoading: false,
    todos: state.todos.map((todo) => (todo.id === id ? { id, name, done } : todo))
  })),
  on(toggleTodoError, (state, { message }) => ({ ...state, isLoading: false, error: message }))
);

export { todoStore };
