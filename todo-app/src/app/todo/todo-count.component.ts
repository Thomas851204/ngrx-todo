import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";

import { getTodosDone, getTodosNotDone } from "./store/todo.selectors";
import { AppStore } from "../app.state";

@Component({
  selector: "app-todo-count",
  standalone: true,
  imports: [CommonModule],
  template: ` <h2>Todos to finish: {{ todoCount$ | async }}</h2>
    <h3>Todos done: {{ doneCount$ | async }}</h3>`
})
export class TodoCountComponent {
  private readonly store = inject(Store<AppStore>);

  doneCount$ = this.store.select(getTodosDone);
  notDoneCount$ = this.store.select(getTodosNotDone);
}
