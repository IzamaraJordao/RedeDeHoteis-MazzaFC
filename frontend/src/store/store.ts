import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
  configureStore({
    reducer: {
    
      [authSlice.name]: authSlice.reducer,
    },
    devTools: true,
  });

//             /// RetunType é um tipo do typescript que pega o tipo de retorno de uma função
export type AppStore = ReturnType<typeof makeStore>; // Exportando o type da função como algo q podemos usar
export type AppState = ReturnType<AppStore["getState"]>; /// Reutiliza o  tipo que o makeStore retorna
// export type AppState<RetunType<typeof makeStore>["getState"]>; /// Reutiliza o  tipo que o makeStore retorna

export type AppThunk<ReturnType = void> = ThunkAction< 
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
