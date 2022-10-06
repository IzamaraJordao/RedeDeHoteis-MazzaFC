import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
//import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface AuthState {
  authState: boolean;
  email: String;
  

}
type LoginAuth = {
  user: {
    name: string
    email: string
  } | undefined
  hotel: {
    cnpj: number
    name: string
    address: {
      street: string
      number: number
      complement: string
      neighborhood: string
      city: string
      state: string
      zip_code: string
    }
    phone: string
    email: string
  } | undefined
  

  token: string
  authState: boolean;
}


// Initial state
const initialState: LoginAuth = {
  authState: false,
  token: "",
  user: undefined,
  hotel: undefined,
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
   
    setAuth(state, action) {
      state.authState = true
      state.token = action.payload.token;
      state.hotel = action.payload.hotel;
      state.user = action.payload.user;

      
    },
    setLogout (state, action) {
      state.authState = false
      state.token = "";
      state.hotel = undefined;
      state.user = undefined;
    }
  },
});

export const { setAuthState, setAuth, setLogout } = authSlice.actions; // Exportando as actions


export const selectAuthState = (state: AppState) => state.auth.authState; // Exportando o state, ou pode chamar direto na onde utilizar
export const selectEmail = (state: AppState) => state.auth.user?.email;
export const selectToken = (state: AppState) => state.auth.token;
export const selectName = (state: AppState) => state.auth.user?.name;// Exportando o state


export default authSlice.reducer; // Exportando o reducer
