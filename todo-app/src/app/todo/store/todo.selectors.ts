import { AppStore } from "../../app.state";
//Gets certain Todos from the appstore based on specific parameters
//gets all todos
export const getTodos = (state: AppStore) => state.todo.todos;
//gets all todos that has a todo.done===true state
export const getTodosDone = (state: AppStore) => state.todo.todos.filter((todo) => todo.done).length;
//gets all todos that has a todo.done===false state
export const getTodosNotDone = (state: AppStore) => state.todo.todos.filter((todo) => !todo.done).length;
