import { Component, OnInit, inject } from "@angular/core";

import { TodoComponent } from "./todo/todo.component";
import { AppStore } from "./app.state";
import { getTodoStarted } from "./todo/store/todo.actions";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [TodoComponent],
  template: `<app-todo></app-todo>`
})
export class AppComponent implements OnInit {
  constructor(private readonly store: Store<AppStore>) {}
  ngOnInit(): void {
    this.store.dispatch(getTodoStarted());
  }
  title = "Todo App";
}
