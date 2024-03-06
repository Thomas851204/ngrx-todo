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
    //we start listening to the actions "stream", using pipe to chain together operations
    return action$.pipe(
      //ofType filters the dispatched actions by type. If the dispatched action is addTodoStarted, then execute the next code block
      ofType(addTodoStarted),
      //exhaustMap maps the addTodoStarted action's payload (prop) to an observable. In simpler terms, if an addTodoStarted action is dispatched, it will carry a payload(prop) object that has an AddTodoRequest type, and we say here that we will call this payload "todo"
      exhaustMap((todo: AddTodoRequest) =>
        //calls the todoService's addTodo method with the the todo:AddTodoRequest object (this is the method that invokes the HTTP request in the service)
        todoService.addTodo(todo).pipe(
          //we have two possible outcomes: success and error, here we handle both scenarios
          //the map method here dispatches the addTodoSuccess action to the reducer with the todo object. The todo here is the object we got in the http response (which should be the same as the todo object we called the addTodo method with, but now it received an id in the backend).
          map((todo) => addTodoSuccess(todo)),
          //the catcherror reads out the message from the http error (if there is one), and dispatches the addTodoError action to the reducer with the message as the action's payload (prop)
          catchError(({ message }: HttpErrorResponse) => {
            return of(addTodoError({ message }));
          })
        )
      )
    );
  },
  //second argument:
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
