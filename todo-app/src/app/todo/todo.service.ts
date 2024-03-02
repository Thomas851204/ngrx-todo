import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { Todo } from "./todo.component";

@Injectable({ providedIn: "root" })
export class TodoService {
  todos: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);

  todoToBeDoneCount: BehaviorSubject<number> = new BehaviorSubject(0);
  todoFinishedCount: BehaviorSubject<number> = new BehaviorSubject(0);

  addTodo(todoName: string) {
    const todo: Todo = {
      name: todoName,
      id: Math.floor(Math.random() * 10000),
      done: false
    };
    this.todos.next([todo, ...this.todos.value]);
    this.updateTodoCounts();
  }

  removeTodo(id: number) {
    this.todos.next(this.todos.value.filter((todo) => todo.id !== id));
    this.updateTodoCounts();
  }

  toggleDone(id: number) {
    this.todos.next(this.todos.value.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
    this.updateTodoCounts();
  }

  private updateTodoCounts() {
    this.todoToBeDoneCount.next(this.todos.value.filter((todo) => !todo.done).length);
    this.todoFinishedCount.next(this.todos.value.filter((todo) => todo.done).length);
  }
}
