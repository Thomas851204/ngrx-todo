//role of reducer: handle the logic based on the action it receives.
import { Todo } from "../todo.component";
import { createReducer, on } from "@ngrx/store";
import { addTodo, removeTodo } from "./todo.actions";

// state type that has the variables(?) we want to have in the store
//here to TodoState type has 1 property: an array of todos
//A Todo is an type with 3 properties: id, name, done
export type TodoState = {
  todos: Todo[];
};

//the initial state of our app: it has an empty array (no need for specifying the todos, it will automatically become Todo)
export const initialState: TodoState = {
  todos: []
};

//create a reducer(s)

//this reducer is to (....)?
const todoStore = createReducer(
  initialState,
  //addTodo: create a new state:
  on(addTodo, (state, { id, name, done }) => ({
    ...state,
    todos: [...state.todos, { id, name, done }]
  })),
  //removeTodo
  on(removeTodo, (state, { id }) => ({
    //filters the todos where the id to be removed is not present and return it
    ...state,
    todos: state.todos.filter((todo) => id !== todo.id)
  })),
  //toggleTodo: toggle whether the todo on the list is done or not.
  on(removeTodo, (state, { id }) => ({
    //remap previous state's todo. If id matches: the done state toggles, else we return the todo
    ...state,
    todos: state.todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
  }))
);

export { todoStore };
