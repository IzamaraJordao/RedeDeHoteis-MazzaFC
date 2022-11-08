import { handleRequest } from '../handleRequest'
import { ProviderContext } from 'notistack'
import { useDispatch } from 'react-redux'
import {
  Reservations,
  setData,
  setIsLoading,
} from '../../store/reservationSlice'
import { Pagination } from '../../template/types/pagination'

export async function reservationPaginate(
  { page, pageSize, filter }: Pagination<Reservations>,
  enqueueSnackbar: ProviderContext['enqueueSnackbar'],
  dispatch: ReturnType<typeof useDispatch>,
) {
  dispatch(setIsLoading(true))
  const response = await handleRequest(
    {
      method: "get",
      url: `/reservations`,
      params: {
        page,
        pageSize,
        filter: JSON.stringify(filter),
      },
    },
    enqueueSnackbar,
  )
  dispatch(setData(response?.data));
  dispatch(setIsLoading(false));
}

export async function reservationCreate(
  reservations: Reservations,
  enqueueSnackbar: ProviderContext['enqueueSnackbar'],
  dispatch: ReturnType<typeof useDispatch>,
) {
  dispatch(setIsLoading(true))
  const response = await handleRequest(
    {
      method:"post",
      url: '/reservations',
      data: reservations,
    },
    enqueueSnackbar,
  )
  dispatch(setIsLoading(false))
  return response
}

export async function reservationUpdate(
    reservations: Reservations,
    enqueueSnackbar: ProviderContext['enqueueSnackbar'],
    dispatch: ReturnType<typeof useDispatch>,
    ) {
    dispatch(setIsLoading(true))
    const response = await handleRequest(
        {
        method: 'put',
        url: `/reservations/${reservations.id}`,
        data: reservations,
        },
        enqueueSnackbar,
    )
    dispatch(setIsLoading(false))
    return response
    }

export async function reservationDelete(
    id: string,
    enqueueSnackbar: ProviderContext['enqueueSnackbar'],
    dispatch: ReturnType<typeof useDispatch>,
    ) {
    dispatch(setIsLoading(true))
    const response = await handleRequest(
        {
        method: 'delete',
        url: `/reservations/${id}`,
        },
        enqueueSnackbar,
    )
    dispatch(setIsLoading(false))
    return response
    }
