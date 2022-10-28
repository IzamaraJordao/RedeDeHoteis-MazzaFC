import { createSlice } from "@reduxjs/toolkit";
import { Pagination } from "../template/types/pagination";
import { Address } from "./address.type";
import { AppState } from "./store";

export type Hotel = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  cnpj: string;
  floor_hotel: number;
  floors: {
    floor: Number
    units: Number
  }[];
  address: Partial<Address> 
  // & Required<Pick<Address, 'id'>>
}

type HotelState = {
 pagination: Pagination<Hotel>
 isLoading: boolean
 isFormLoading: boolean
 hotel: Hotel | undefined
 data: Hotel[] 
}


// Initial state
const initialState: HotelState = {
  pagination: {
    page: 1,
    pageSize: 10,
    filter: {},
    total: 0,
  },
  isLoading: false,
  isFormLoading: false,
  hotel: undefined,
  data: [],
};

// Actual Slice
export const hotelSlice = createSlice({ /// Recebe 3 parametros
  name: "hotel",
  initialState,
  reducers: {

    setData(state, action) {
      state.data = action.payload.result;
      state.pagination.total = action.payload.total;
      state.pagination.page = action.payload.current;
      state.pagination.pageSize = action.payload.pageSize;
    },
    setHotel(state, {payload}) {
      state.hotel = payload;
    },
    setIsLoading(state, {payload}) {
      state.isLoading = payload;
    }
  },
});

export const { setData, setIsLoading, setHotel } = hotelSlice.actions; // Exportando as actions


export const selectData = (state: AppState) => state.hotel.data;
export const selectHotel = (state: AppState) => state.hotel.hotel;
export const selectPaginate = (state: AppState) => state.hotel.pagination;// Exportando o state
export const selectIsLoading = (state: AppState) => state.hotel.isLoading;// Exportando o state
export const selectIsFormLoading = (state: AppState) => state.hotel.isFormLoading;// Exportando o state

export default hotelSlice.reducer; // Exportando o reducer
