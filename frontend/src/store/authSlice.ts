import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
//import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface AuthState {
  authState: boolean;
  email: String;
}

// Initial state
const initialState: AuthState = {
  authState: false,
  email: "Faça o login para continuar",
};

// Actual Slice
export const authSlice = createSlice({ /// Recebe 3 parametros
  name: "auth",
  initialState,
  reducers: {

    // Action to set the authentication status
    setAuthState(state, action) {
      state.authState = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    }
  },
});

export const { setAuthState, setEmail } = authSlice.actions; // Exportando as actions

export const selectAuthState = (state: AppState) => state.auth.authState; // Exportando o state, ou pode chamar direto na onde utilizar
export const selectEmail = (state: AppState) => state.auth.email; // Exportando o state

export default authSlice.reducer; // Exportando o reducer
