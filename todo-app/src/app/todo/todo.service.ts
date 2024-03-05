import { Injectable, inject } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { Todo } from "./todo.component";
import { HttpClient } from "@angular/common/http";
import {
  AddTodoRequest,
  AddTodoResponse,
  GetTodoResponse,
  RemoveTodoResponse,
  ToggleTodoResponse
} from "./store/todo.actions";

//Service methods no longer needed as the store handles these operations.
//Deleted all methods, and added new ones that communicate with the backend.
//These new methods by themselves are not connected to the store or any of its components here. To do that
// we need to create effects and connect them to the actions.

@Injectable({ providedIn: "root" })
export class TodoService {
  todos: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);

  todoToBeDoneCount: BehaviorSubject<number> = new BehaviorSubject(0);
  todoFinishedCount: BehaviorSubject<number> = new BehaviorSubject(0);
  private baseUrl = "http://localhost:3000/todos";
  private http = inject(HttpClient);

  getTodos() {
    return this.http.get<Todo[]>(this.baseUrl);
  }

  addTodo(todo: AddTodoRequest) {
    return this.http.post<AddTodoResponse>(this.baseUrl, todo);
  }

  removeTodo(id: number) {
    return this.http.delete<RemoveTodoResponse>(`${this.baseUrl}/${id}`);
  }

  toggleTodo(id: number, done: boolean) {
    return this.http.put<ToggleTodoResponse>(`${this.baseUrl}/${id}`, { done });
  }
}
