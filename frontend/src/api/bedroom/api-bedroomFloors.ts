import { handleRequest } from "../handleRequest";
import {ProviderContext} from 'notistack';
import { useDispatch } from "react-redux";
import { Bedroom,  setData,  setIsLoading } from "../../store/bedroomSlice";
import { Pagination } from "../../template/types/pagination";


export async function getFloors(
     hotel_id: Bedroom['id'],
    enqueueSnackbar: ProviderContext['enqueueSnackbar'],
    dispatch: ReturnType<typeof useDispatch>,
) : Promise<Bedroom['floor'][]> {
    dispatch(setIsLoading(true));
    const response =  await handleRequest({
        method: "get",
        params: {
            hotel_id,
        },
        url: `/floor`,
    }, enqueueSnackbar ); 
    dispatch(setIsLoading(false));
    return response?.data;
};


export async function getBedroomFloors(
     hotel_id: Bedroom['id'],
     floor: Bedroom['floor'],
    enqueueSnackbar: ProviderContext['enqueueSnackbar'],
    dispatch: ReturnType<typeof useDispatch>,
) : Promise<Bedroom[]> {
    dispatch(setIsLoading(true));
    const response =  await handleRequest({
        method: "get",
        params: {
            hotel_id,
            floor
        },
        url: `/floor/bedroom`,
    }, enqueueSnackbar );
    dispatch(setData(response?.data));
    dispatch(setIsLoading(false));
    return response?.data;
};


export async function bedroomPut(
  id: Bedroom['id'],
  data: Bedroom,
 enqueueSnackbar: ProviderContext['enqueueSnackbar'],
 dispatch: ReturnType<typeof useDispatch>
){
 dispatch(setIsLoading(true));
 const response =  await handleRequest({
     method: "put",
     url: `/bedroom/${id}`,
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

export async function bedroomGet(
  id: Bedroom['id'],
 enqueueSnackbar: ProviderContext['enqueueSnackbar'],
 dispatch: ReturnType<typeof useDispatch>
){
 dispatch(setIsLoading(true));
 const response =  await handleRequest({
     method: "get",
     url: `/bedroom/${id}`,
 }, enqueueSnackbar);
 dispatch(setData(response?.data));
 dispatch(setIsLoading(false));
}

export async function bedroomPaginate(
   {page,pageSize,filter}:Pagination<Bedroom>,
   enqueueSnackbar: ProviderContext['enqueueSnackbar'],
   dispatch: ReturnType<typeof useDispatch>,
){
 dispatch(setIsLoading(true));
 const response =  await handleRequest({
     method: "get",
     url: `/bedroom`,
     params: {
       page,
       pageSize,
       filter: JSON.stringify(filter)
     }
 }, enqueueSnackbar);
 dispatch(setData(response?.data));
 dispatch(setIsLoading(false));
}