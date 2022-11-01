import { handleRequest } from "../handleRequest";
import {ProviderContext} from 'notistack';
import { useDispatch } from "react-redux";
import { Bedroom,  setIsLoading } from "../../store/bedroomSlice";


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
) : Promise<Bedroom['floor'][]> {
    dispatch(setIsLoading(true));
    const response =  await handleRequest({
        method: "get",
        params: {
            hotel_id,
            floor
        },
        url: `/floor/bedroom`,
    }, enqueueSnackbar );
    dispatch(setIsLoading(false));
    return response?.data;
};





