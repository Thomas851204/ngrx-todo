import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";
import { MatCardModule } from "@angular/material/card";

import { AppStore } from "../app.state";
import { getDoneCount, getTodoCount } from "../todo/store/todo.selectors";

@Component({
  selector: "app-todo-count",
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `<mat-card-title-group>
    <mat-card-title>Todos to finish: {{ todoCount$ | async }}</mat-card-title>
    <mat-card-subtitle>Todos done: {{ doneCount$ | async }}</mat-card-subtitle>
  </mat-card-title-group>`
})
export class TodoCountComponent {
  private store = inject(Store<AppStore>);
  todoCount$ = this.store.select(getTodoCount);
  doneCount$ = this.store.select(getDoneCount);
}
