import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";

import { addTodoStarted } from "../todo/store/todo.actions";
import { AppStore } from "../app.state";

@Component({
  selector: "app-todo-input",
  standalone: true,
  imports: [FormsModule, MatInputModule, MatIconModule, MatButtonModule, MatFormFieldModule],
  template: ` <div style="display: flex; width: 100%">
    <mat-form-field style="flex: 1">
      <mat-label>Add new todo</mat-label>
      <input data-testid="todo-input" matInput type="text" [(ngModel)]="todoName" />
    </mat-form-field>
    <button data-testid="todo-add-button" mat-icon-button [disabled]="!todoName.trim().length" (click)="onAddTodo()">
      <mat-icon>add</mat-icon>
    </button>
  </div>`
})
export class TodoInputComponent {
  private store = inject(Store<AppStore>);
  todoName = "";

  onAddTodo() {
    if (!this.todoName.trim()) {
      return;
    }
    this.store.dispatch(addTodoStarted({ name: this.todoName.trim(), done: false }));
    this.todoName = "";
  }
}
