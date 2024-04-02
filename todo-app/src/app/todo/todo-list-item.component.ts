import { Component, Input, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

import { AppStore } from "../app.state";
import { removeTodoStarted, toggleTodoStarted } from "../todo/store/todo.actions";
import { Todo } from "./todo.component";

@Component({
  selector: "app-todo-list-item",
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, MatButtonModule, MatIconModule],
  template: ` @if (todo) {
    <div
      data-testid="todo-item"
      style="margin: 10px 0; display: flex; align-items: center; justify-content: space-between">
      <mat-checkbox data-testid="todo-checkbox" [checked]="todo.done" (change)="onToggleTodo(todo)">
        {{ todo.name }}
      </mat-checkbox>
      <button mat-icon-button color="warn" aria-label="trash can icon" (click)="onDeleteTodo(todo.id)">
        <mat-icon>delete</mat-icon>
      </button>
    </div>
    }`
})
export class TodoListItemComponent {
  private store = inject(Store<AppStore>);
  @Input() todo?: Todo;
  onDeleteTodo(id: number) {
    this.store.dispatch(removeTodoStarted({ id }));
  }

  onToggleTodo(todo: Todo) {
    this.store.dispatch(toggleTodoStarted({ ...todo, done: !todo.done }));
  }
}
