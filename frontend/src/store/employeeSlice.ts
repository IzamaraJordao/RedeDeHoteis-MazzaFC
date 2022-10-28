

import { createSlice } from "@reduxjs/toolkit";
import { Pagination } from "../template/types/pagination";
import { AppState } from "./store";
import {Address} from './address.type'

export type Employee = {
 id: string
 name: string
 rg: string
 cpf: string
 email: string
 phone: string
 note: string
 active: boolean
 password: string
 hotel_id: string
 is_first_access: boolean
 address: Partial<Address> & Required<Pick<Address, 'id'>>
}

type EmployeeState = {
    pagination: Pagination<Employee>
    isLoading: boolean
    isFormLoading: boolean
    employee: Employee | undefined
    data: Employee[]
}

// Initial state
const initialState: EmployeeState = {
    pagination: {
        page: 1,
        pageSize: 10,
        filter: {},
        total: 0,
    },
    isLoading: false,
    isFormLoading: false,
    employee: undefined,
    data: [],
};

// Actual Slice
export const employeeSlice = createSlice({ /// Recebe 3 parametros
    name: "employee",
    initialState,
    reducers: {
        setData(state, action) {
            state.data = action.payload.result;
            state.pagination.total = action.payload.total;
            state.pagination.page = action.payload.current;
            state.pagination.pageSize = action.payload.pageSize;
        },
        setEmployee(state, {payload}) {
            state.employee = payload;
        },
        setIsLoading(state, {payload}) {
            state.isLoading = payload;
        }
    },
});

export const { setData, setIsLoading,setEmployee } = employeeSlice.actions; // Exportando as actions

// Selectors
export const selectEmployee = (state: AppState) => state.employee; // Exportando o estado
export const selectEmployeeData = (state: AppState) => state.employee.employee; // Exportando o estado
export const selectData = (state: AppState) => state.employee.data; // Exportando o estado
export const selectPaginate = (state: AppState) => state.employee.pagination; // Exportando o estado
export const selectIsLoading = (state: AppState) => state.employee.isLoading; // Exportando o estado
export const selectIsFormLoading = (state: AppState) => state.employee.isFormLoading; // Exportando o estado

export default employeeSlice.reducer;