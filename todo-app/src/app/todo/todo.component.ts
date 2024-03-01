import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoListItemComponent } from './todo-list-item.component';
import { TodoCountComponent } from './todo-count.component';
import { TodoInputComponent } from './todo-input.component';
import { TodoService } from './todo.service';

export interface Todo {
  id: number;
  name: string;
  done: boolean;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    CommonModule,
    TodoListItemComponent,
    TodoCountComponent,
    TodoInputComponent,
  ],
  template: `
    <app-todo-count></app-todo-count>
    <app-todo-input></app-todo-input>
    @for (todo of todos$ | async; track todo.id) {
    <app-todo-list-item [todo]="todo"></app-todo-list-item>
    }
  `,
})
export class TodoComponent {
  private readonly todoService = inject(TodoService);
  todos$ = this.todoService.todos;
}
