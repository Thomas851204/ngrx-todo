import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";

import { AppStore } from "../app.state";
import { TodoListItemComponent } from "./todo-list-item.component";
import { TodoCountComponent } from "./todo-count.component";
import { TodoInputComponent } from "./todo-input.component";
import { getTodos } from "./store/todo.selectors";

export type Todo = {
  id: number;
  name: string;
  done: boolean;
};

@Component({
  selector: "app-todo",
  standalone: true,
  imports: [CommonModule, TodoListItemComponent, TodoCountComponent, TodoInputComponent],
  template: `
    <app-todo-count></app-todo-count>
    <app-todo-input></app-todo-input>
    @for (todo of todos$ | async; track todo.id) {
    <app-todo-list-item [todo]="todo"></app-todo-list-item>
    }
  `
})
export class TodoComponent {
  private readonly store = inject(Store<AppStore>);
  //$ at the end means its a behavious subject(?)
  todos$ = this.store.select(getTodos);
}
