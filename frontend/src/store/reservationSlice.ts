import { createSlice } from '@reduxjs/toolkit'
import { Pagination } from '../template/types/pagination'
import { Guest } from './guestSlice'
import { AppState } from './store'


export type Reservations = {
  id: string;
  check_in: Date;
  check_out: Date;
  check_in_static: Date;
  check_out_static: Date;
  guests: Guest;
  room_type_id: string;
}

type ReservationState = {
  pagination: Pagination<Reservations>
  isLoading: boolean
  isFormLoading: boolean
  reservations: Reservations | undefined
  data: Reservations[]
}

// Initial state
const initialState: ReservationState = {
  pagination: {
    page: 1,
    pageSize: 10,
    filter: {},
    total: 0,
  },
  isLoading: false,
  isFormLoading: false,
  reservations: undefined,
  data: [],
}

// Actual Slice
export const reservationsSlice = createSlice({
  /// Recebe 3 parametros
  name: 'reservations',
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload.result;
      state.pagination.total = action.payload.total;
      state.pagination.page = action.payload.current;
      state.pagination.pageSize = action.payload.pageSize;
    },
    setReservations(state, { payload }) {
      state.reservations = payload;
    },
    setIsLoading(state, { payload }) {
      state.isLoading = payload;
    },
  },
})

export const { setData, setIsLoading, setReservations } =
  reservationsSlice.actions; // Exportando as actions

// Selectors
export const selectRegistration = (state: AppState) => state.reservations // Exportando o estado
export const selectRegistrationData = (state: AppState) =>state.reservations.reservations // Exportando o estado
export const selectData = (state: AppState) => state.reservations.data // Exportando o estado
export const selectPaginate = (state: AppState) => state.reservations.pagination // Exportando o estado
export const selectIsLoading = (state: AppState) => state.reservations.isLoading // Exportando o estado
export const selectIsFormLoading = (state: AppState) =>state.reservations.isFormLoading // Exportando o estado

export default reservationsSlice.reducer
