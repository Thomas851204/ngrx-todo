import { AppStore } from "../../app.state";

export const getTodos = (state: AppStore) => state.todo?.todos;
export const getTodoCount = (state: AppStore) => state.todo?.todos.filter((t) => !t.done).length;
export const getDoneCount = (state: AppStore) => state.todo?.todos.filter((t) => t.done).length;
