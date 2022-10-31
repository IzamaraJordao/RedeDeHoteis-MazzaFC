import { handleRequest } from "../handleRequest";
import {ProviderContext} from 'notistack';
import { useDispatch } from "react-redux";
import { Bedroom,  setIsLoading } from "../../store/bedroomSlice";


export async function BedroomByFloors(
     hotel_id: Bedroom['id'],
    enqueueSnackbar: ProviderContext['enqueueSnackbar'],
    dispatch: ReturnType<typeof useDispatch>,
  
){
    dispatch(setIsLoading(true));
    const response =  await handleRequest({
        method: "get",
        url: `/floor${hotel_id}`,
    }, enqueueSnackbar );
   
    dispatch(setIsLoading(false));
    return response?.data;
};





