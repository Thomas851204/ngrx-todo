//effects acts as a "middleware" for the actions before they reach the reducer
import { inject } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

import { TodoService } from "../todo.service";
import {
  AddTodoRequest,
  addTodoStarted,
  addTodoSuccess,
  addTodoError,
  getTodoStarted,
  getTodoSuccess,
  getTodoError,
  removeTodoStarted,
  RemoveTodoRequest,
  removeTodoSuccess,
  removeTodoError,
  toggleTodoStarted,
  ToggleTodoRequest,
  toggleTodoSuccess,
  toggleTodoError
} from "./todo.actions";

//an effect has 1-2 arguments
//first argument: inject Actions and the todoService, return with an action "stream/observable"
const handleAddTodoSideEffects$ = createEffect(
  (action$ = inject(Actions), todoService = inject(TodoService)) => {
    //we start listening to the actions "stream"
    return action$.pipe(
      //ofType filters the dispatched actions by type. If the dispatched action is addTodoStarted, then execute the next code block
      ofType(addTodoStarted),
      //exhaustMap maps the addTodoStarted action to an observable(?)...
      exhaustMap((todo: AddTodoRequest) =>
        //adds the AddTodoRequest object to the todoService's addTodo method (this is the method that invokes the HTTP request in the service)
        todoService.addTodo(todo).pipe(
          //we have two possible outcomes: success and error, here we handle both scenarios
          map((todo) => addTodoSuccess(todo)),
          catchError(({ message }: HttpErrorResponse) => {
            return of(addTodoError({ message }));
          })
        )
      )
    );
  },
  { functional: true }
);

const handleGetTodoSideEffects$ = createEffect(
  (action$ = inject(Actions), todoService = inject(TodoService)) => {
    return action$.pipe(
      ofType(getTodoStarted),
      exhaustMap(() =>
        todoService.getTodos().pipe(
          map((todo) => getTodoSuccess({ todos: todo })),
          catchError(({ message }: HttpErrorResponse) => {
            return of(getTodoError({ message }));
          })
        )
      )
    );
  },
  { functional: true }
);

const handleRemoveTodoSideEffects$ = createEffect(
  (action$ = inject(Actions), todoService = inject(TodoService)) => {
    return action$.pipe(
      ofType(removeTodoStarted),
      exhaustMap(({ id }: RemoveTodoRequest) =>
        todoService.removeTodo(id).pipe(
          map((id) => removeTodoSuccess(id)),
          catchError(({ message }: HttpErrorResponse) => {
            return of(removeTodoError({ message }));
          })
        )
      )
    );
  },
  { functional: true }
);

const handleToggleTodoSideEffects$ = createEffect(
  (action$ = inject(Actions), todoService = inject(TodoService)) => {
    return action$.pipe(
      ofType(toggleTodoStarted),
      exhaustMap(({ id, done }: ToggleTodoRequest) =>
        todoService.toggleTodo(id, done).pipe(
          map(({ id, done }) => toggleTodoSuccess({ id, done })),
          catchError(({ message }: HttpErrorResponse) => {
            return of(toggleTodoError({ message }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const todoEffects = {
  handleAddTodoSideEffects$,
  handleGetTodoSideEffects$,
  handleRemoveTodoSideEffects$,
  handleToggleTodoSideEffects$
};
