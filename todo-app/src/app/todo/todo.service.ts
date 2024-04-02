import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import {
  AddTodoRequest,
  AddTodoResponse,
  RemoveTodoRequest,
  ToggleTodoRequest,
  ToggleTodoResponse
} from "./store/todo.actions";
import { Todo } from "./todo.component";

@Injectable({ providedIn: "root" })
export class TodoService {
  private baseUrl = "http://localhost:3000/todos";
  private http = inject(HttpClient);

  getTodos() {
    return this.http.get<Todo[]>(this.baseUrl);
  }

  addTodo(todo: AddTodoRequest) {
    return this.http.post<AddTodoResponse>(this.baseUrl, todo);
  }

  removeTodo(req: RemoveTodoRequest) {
    return this.http.delete<void>(`${this.baseUrl}/${req.id}`);
  }

  toggleDone(todo: ToggleTodoRequest) {
    return this.http.put<ToggleTodoResponse>(`${this.baseUrl}/${todo.id}`, { done: todo.done });
  }
}
