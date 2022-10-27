import { handleRequest } from "../handleRequest";
import {ProviderContext} from 'notistack';
import { useDispatch } from "react-redux";
import { Guest, setData, setIsLoading , } from "../../store/guestSlice";
import { Pagination } from "../../template/types/pagination";

export async function guestPaginate(
    {
      page,
      pageSize,
      filter,
    }: Pagination<Guest>,
    enqueueSnackbar: ProviderContext['enqueueSnackbar'],
    dispatch: ReturnType<typeof useDispatch>
)
{
    dispatch(setIsLoading(true));
    const response =  await handleRequest({
        method: "get",
        url: '/guest',
        params: {
          page,
          pageSize,
          filter: JSON.stringify(filter),
        }
    }, enqueueSnackbar);
    dispatch(setData(response?.data));
    dispatch(setIsLoading(false));

};

export async function guestById(
     id: Guest['id'],
    enqueueSnackbar: ProviderContext['enqueueSnackbar'],
    dispatch: ReturnType<typeof useDispatch>,
  
){
    dispatch(setIsLoading(true));
    const response =  await handleRequest({
        method: "get",
        url: `/guest/${id}`,
    }, enqueueSnackbar );
   
    dispatch(setIsLoading(false));
    return response?.data;
};


export async function guestDelete(
     id: Guest['id'],
    enqueueSnackbar: ProviderContext['enqueueSnackbar'],
    dispatch: ReturnType<typeof useDispatch>
){
    dispatch(setIsLoading(true));
    const response =  await handleRequest({
        method: "delete",
        url: `/guest/${id}`,
    }, enqueueSnackbar);
    enqueueSnackbar(response?.data, {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      },
      variant: 'success'
    })
    dispatch(setIsLoading(false));
};


export async function guestPut(
     id: Guest['id'],
     data: Guest,
    enqueueSnackbar: ProviderContext['enqueueSnackbar'],
    dispatch: ReturnType<typeof useDispatch>
){
    dispatch(setIsLoading(true));
    const response =  await handleRequest({
        method: "put",
        url: `/guest/${id}`,
        data
    }, enqueueSnackbar);
    enqueueSnackbar(response?.data, {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      },
      variant: 'success'
    })
    dispatch(setIsLoading(false));
};

export async function guestPost(
      data: Guest,
      enqueueSnackbar: ProviderContext['enqueueSnackbar'],
      dispatch: ReturnType<typeof useDispatch>
  ){
      dispatch(setIsLoading(true));
      const response =  await handleRequest({
          method: "post",
          url: `/guest`,
          data
      }, enqueueSnackbar);
      enqueueSnackbar(response?.data, {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        },
        variant: 'success'
      })
      dispatch(setIsLoading(false));
  }