import { ApplicationConfig, isDevMode } from "@angular/core";
import { provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";

import { todoStore } from "./todo/store/todo.reducers";
import { provideEffects } from "@ngrx/effects";
import { todoEffects } from "./todo/store/todo.effects";
import { HttpClient, provideHttpClient } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(
      {
        //added the todoStore
        todo: todoStore
      },
      {
        runtimeChecks: {
          //State and actions can not be overwritten directly
          strictStateImmutability: true,
          strictActionImmutability: true
        }
      }
    ),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(todoEffects),
    provideHttpClient()
  ]
};
