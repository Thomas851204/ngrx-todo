import { Component, Input, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";

import { Todo } from "./todo.component";
import { AppStore } from "../app.state";
import { removeTodoStarted, toggleTodoStarted } from "./store/todo.actions";

@Component({
  selector: "app-todo-list-item",
  standalone: true,
  imports: [CommonModule],
  template: ` @if (todo) {
    <div>
      <input type="checkbox" [checked]="todo.done" (change)="onToggleTodo()" />
      {{ todo.name }}
      <button (click)="onDeleteTodo()">Delete</button>
    </div>
    }`
})
export class TodoListItemComponent {
  private readonly store = inject(Store<AppStore>);

  @Input() todo?: Todo;
  onDeleteTodo() {
    this.store.dispatch(removeTodoStarted({ id: this.todo!.id }));
  }

  onToggleTodo() {
    this.store.dispatch(toggleTodoStarted({ id: this.todo!.id, done: !this.todo?.done }));
  }
}