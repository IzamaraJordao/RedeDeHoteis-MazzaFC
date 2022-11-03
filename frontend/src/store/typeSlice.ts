import { createSlice } from "@reduxjs/toolkit";
import { Pagination } from "../template/types/pagination";
import { AppState } from "./store";


export type Type = {
  id: string
  name: string
  color: string

}

type TypeState = {
 pagination: Pagination<Type>
 isLoading: boolean
 isFormLoading: boolean
 type: Type | undefined
 data: Type[] 
}


// Initial state
const initialState: TypeState = {
  pagination: {
    page: 1,
    pageSize: 10,
    filter: {},
    total: 0,
  },
  isLoading: false,
  isFormLoading: false,
  type: undefined,
  data: [],
};

// Actual Slice
export const typeSlice = createSlice({ /// Recebe 3 parametros
  name: "type",
  initialState,
  reducers: {

    setData(state, action) {
      state.data = action.payload.result;
      state.pagination.total = action.payload.total;
      state.pagination.page = action.payload.current;
      state.pagination.pageSize = action.payload.pageSize;
    },
    setType(state, {payload}) {
      state.type = payload;
    },
    setIsLoading(state, {payload}) {
      state.isLoading = payload;
    }
  },
});

export const { setData, setIsLoading, setType } = typeSlice.actions; // Exportando as actions


export const selectTypeData = (state: AppState) => state.type.data;
export const selectType = (state: AppState) => state.type.type;
export const selectPaginate = (state: AppState) => state.type.pagination;// Exportando o state
export const selectIsLoading = (state: AppState) => state.type.isLoading;// Exportando o state
export const selectIsFormLoading = (state: AppState) => state.type.isFormLoading;// Exportando o state

export default typeSlice.reducer; // Exportando o reducer
