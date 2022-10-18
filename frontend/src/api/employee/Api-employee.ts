import { handleRequest } from '../handleRequest'
import { ProviderContext } from 'notistack'
import { useDispatch } from 'react-redux'
import { Employee, setData, setIsLoading } from '../../store/employeeSlice'
import { Pagination } from '../../template/types/pagination'

export async function employeePaginate(
  { page, pageSize, filter }: Pagination<Employee>,
  enqueueSnackbar: ProviderContext['enqueueSnackbar'],
  dispatch: ReturnType<typeof useDispatch>,
) {
  dispatch(setIsLoading(true))
  const response = await handleRequest(
    {
      method: 'get',
      url: '/employee',
      params: {
        page,
        pageSize,
        filter: JSON.stringify(filter),
      },
    },
    enqueueSnackbar,
  )
  dispatch(setData(response?.data))
  dispatch(setIsLoading(false))
}

export async function employeeById(
  id: Employee['id'],
  enqueueSnackbar: ProviderContext['enqueueSnackbar'],
  dispatch: ReturnType<typeof useDispatch>,
) {
  dispatch(setIsLoading(true))
  const response = await handleRequest(
    {
      method: 'get',
      url: `/employee/${id}`,
    },
    enqueueSnackbar,
  )
  dispatch(setIsLoading(false))
  return response?.data
}

export async function employeeDelete(
  id: Employee['id'],
  enqueueSnackbar: ProviderContext['enqueueSnackbar'],
  dispatch: ReturnType<typeof useDispatch>,
) {
  dispatch(setIsLoading(true))
  const response = await handleRequest(
    {
      method: 'delete',
      url: `/employee/${id}`,
    },
    enqueueSnackbar,
  )
  enqueueSnackbar(response?.data, {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center',
    },
    variant: 'success',
  })
  dispatch(setIsLoading(false))
}
export async function employeePut(
  id: Employee['id'],
  data: Employee,
  enqueueSnackbar: ProviderContext['enqueueSnackbar'],
  dispatch: ReturnType<typeof useDispatch>,
) {
  dispatch(setIsLoading(true))
  const response = await handleRequest(
    {
      method: 'put',
      url: `/employee/${id}`,
      data,
    },
    enqueueSnackbar,
  )
  dispatch(setIsLoading(false))
  if (response?.status === 200) {
    enqueueSnackbar(response?.data, {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      variant: 'success',
    })
  }
}
