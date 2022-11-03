import { createSlice } from "@reduxjs/toolkit";
import { Pagination } from "../template/types/pagination";
import { AppState } from "./store";


export type Status = {
  id: string
  name: string
}

type StatusState = {
 pagination: Pagination<Status>
 isLoading: boolean
 isFormLoading: boolean
 status: Status | undefined
 data: Status[] 
}


// Initial state
const initialState: StatusState = {
  pagination: {
    page: 1,
    pageSize: 10,
    filter: {},
    total: 0,
  },
  isLoading: false,
  isFormLoading: false,
  status: undefined,
  data: [],
};

// Actual Slice
export const statusSlice = createSlice({ /// Recebe 3 parametros
  name: "status",
  initialState,
  reducers: {

    setData(state, action) {
      state.data = action.payload.result;
      state.pagination.total = action.payload.total;
      state.pagination.page = action.payload.current;
      state.pagination.pageSize = action.payload.pageSize;
    },
    setStatus(state, {payload}) {
      state.status = payload;
    },
    setIsLoading(state, {payload}) {
      state.isLoading = payload;
    }
  },
});

export const { setData, setIsLoading, setStatus } = statusSlice.actions; // Exportando as actions


export const selectStatusData = (state: AppState) => state.status.data;
export const selectStatus = (state: AppState) => state.status.status;
export const selectPaginate = (state: AppState) => state.status.pagination;// Exportando o state
export const selectIsLoading = (state: AppState) => state.status.isLoading;// Exportando o state
export const selectIsFormLoading = (state: AppState) => state.status.isFormLoading;// Exportando o state

export default statusSlice.reducer; // Exportando o reducer
