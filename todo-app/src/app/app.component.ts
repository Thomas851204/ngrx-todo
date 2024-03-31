import { Component, OnInit, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TodoComponent } from "./todo/todo.component";
import { Store } from "@ngrx/store";
import { AppStore } from "./app.state";
import { loadTodosStarted } from "./todo/store/todo.actions";
import { MatCommonModule } from "@angular/material/core";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, TodoComponent, MatCommonModule],
  template: `<div style="min-height:100%; background-color: #673ab7;">
    <app-todo style="min-height: 100%; width: 100%; display: flex; justify-content: center; "></app-todo>
  </div>`
})
export class AppComponent implements OnInit {
  private readonly store = inject(Store<AppStore>);

  title = "todo-app";

  ngOnInit() {
    this.store.dispatch(loadTodosStarted());
  }
}
