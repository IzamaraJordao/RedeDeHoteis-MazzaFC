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
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    // Action to set the authentication status
    setAuthState(state:any, action:any) {
      state.authState = action.payload;
    },
    setEmail(state:any, action:any) {
      state.email = action.payload;
    }
  },
});

export const { setAuthState, setEmail } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth.authState;
export const selectEmail = (state: AppState) => state.auth.email;

export default authSlice.reducer;
