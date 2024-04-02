//role of app.state:
import { TodoState } from "./todo/store/todo.reducers";

export interface AppStore {
  todo?: TodoState;
}
