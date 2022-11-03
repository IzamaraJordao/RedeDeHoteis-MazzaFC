import { createSlice } from "@reduxjs/toolkit";
import { Pagination } from "../template/types/pagination";
import { AppState } from "./store";

export enum BedroomStatus {
  UNAVAILABLE = 1
}

export enum BedroomType {
  NOT_DEFINED = 1
}

export type Bedroom = {
  id?: string
  name: string
  floor: string
  hotel_id: string
  position_x: number | null 
  position_y: number | null
  status_room_id: BedroomStatus
  room_type_id: BedroomType

}

type BedroomState = {
 pagination: Pagination<Bedroom>
 isLoading: boolean
 isFormLoading: boolean
 bedroom: Bedroom | undefined
 data: Bedroom[] 
}


// Initial state
const initialState: BedroomState = {
  pagination: {
    page: 1,
    pageSize: 10,
    filter: {},
    total: 0,
  },
  isLoading: false,
  isFormLoading: false,
  bedroom: undefined,
  data: [],
};

// Actual Slice
export const bedroomSlice = createSlice({ /// Recebe 3 parametros
  name: "bedroom",
  initialState,
  reducers: {

    setData(state, action) {
      state.data = action.payload;
    },
    setBedroom(state, {payload}) {
      state.bedroom = payload;
    },
    setIsLoading(state, {payload}) {
      state.isLoading = payload;
    }
  },
});

export const { setData, setIsLoading, setBedroom } = bedroomSlice.actions; // Exportando as actions


export const selectBedroomData = (state: AppState) => state.bedroom.data;
export const selectBedroom = (state: AppState) => state.bedroom.bedroom;
export const selectPaginate = (state: AppState) => state.bedroom.pagination;// Exportando o state
export const selectIsLoading = (state: AppState) => state.bedroom.isLoading;// Exportando o state
export const selectIsFormLoading = (state: AppState) => state.bedroom.isFormLoading;// Exportando o state

export default bedroomSlice.reducer; // Exportando o reducer
