
import { createSlice } from "@reduxjs/toolkit";
import { Pagination } from "../template/types/pagination";
import { Address } from "./address.type";
import { AppState } from "./store";

export type Guest = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  rg: string;
  address: Partial<Address> 
  // & Required<Pick<Address, 'id'>>
}

type GuestState = {
 pagination: Pagination<Guest>
 isLoading: boolean
 isFormLoading: boolean
 guest: Guest | undefined
 data: Guest[] 
}


// Initial state
const initialState: GuestState = {
  pagination: {
    page: 1,
    pageSize: 10,
    filter: {},
    total: 0,
  },
  isLoading: false,
  isFormLoading: false,
  guest: undefined,
  data: [],
};

// Actual Slice
export const guestSlice = createSlice({ /// Recebe 3 parametros
  name: "guest",
  initialState,
  reducers: {

    setData(state, action) {
      state.data = action.payload.result
      state.pagination.total = action.payload.total
      state.pagination.page = action.payload.current
      state.pagination.pageSize = action.payload.pageSize
    },
    setGuest(state, {payload}) {
      state.guest = payload;
    },
    setIsLoading(state, {payload}) {
      state.isLoading = payload;
    }
  },
});

export const { setData, setIsLoading, setGuest } = guestSlice.actions; // Exportando as actions


export const selectData = (state: AppState) => state.guest.data;
export const selectGuest = (state: AppState) => state.guest.guest;
export const selectGuestData = (state: AppState) => state.guest.guest;
export const selectPaginate = (state: AppState) => state.guest.pagination;// Exportando o state
export const selectIsLoading = (state: AppState) => state.guest.isLoading;// Exportando o state
export const selectIsFormLoading = (state: AppState) => state.guest.isFormLoading;// Exportando o state

export default guestSlice.reducer; // Exportando o reducer
