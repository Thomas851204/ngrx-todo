import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";

import { AppStore } from "../app.state";
import { addTodo } from "./store/todo.actions";

@Component({
  selector: "app-todo-input",
  standalone: true,
  imports: [FormsModule],
  template: `<input type="text" [(ngModel)]="todoName" />
    <button [disabled]="!todoName.trim().length" (click)="onAddTodo()">Add</button>`
})
export class TodoInputComponent {
  private readonly store = inject(Store<AppStore>);
  todoName = "";

  onAddTodo() {
    if (!this.todoName.trim()) {
      return;
    }
    //for now we will assign a random number as an id to a new todo item
    //here we will not select, we will dispatch, as we are putting in a new item
    this.store.dispatch(addTodo({ id: Math.floor(Math.random() * 10000), name: this.todoName, done: false }));
    this.todoName = "";
  }
}
