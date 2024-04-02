import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";

import { AppStore } from "../app.state";
import { getTodos } from "../todo/store/todo.selectors";
import { TodoListItemComponent } from "./todo-list-item.component";
import { TodoCountComponent } from "./todo-count.component";
import { TodoInputComponent } from "./todo-input.component";

export interface Todo {
  id: number;
  name: string;
  done: boolean;
}

@Component({
  selector: "app-todo",
  standalone: true,
  imports: [CommonModule, TodoListItemComponent, TodoCountComponent, TodoInputComponent, MatCardModule],
  template: ` <mat-card style="margin: 30px; max-width: 450px; width: 100%">
    <mat-card-header
      style="background-color: gold; border-radius: 5px 5px 0 0; padding-bottom: 1rem; margin-bottom: 1rem">
      <app-todo-count></app-todo-count>
    </mat-card-header>
    <mat-card-content>
      <app-todo-input></app-todo-input>
      @for (todo of todos$ | async; track todo.id) {
      <app-todo-list-item [todo]="todo"></app-todo-list-item>
      }
    </mat-card-content>
  </mat-card>`
})
export class TodoComponent {
  private store = inject(Store<AppStore>);
  todos$ = this.store.select(getTodos);
}
