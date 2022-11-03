import { handleRequest } from "../handleRequest";
import {ProviderContext} from 'notistack';
import { useDispatch } from "react-redux";
import { Type,  setIsLoading, setData } from "../../store/typeSlice";
import { Pagination } from "../../template/types/pagination";


export async function typePaginate(
  {
    page,
    pageSize,
    filter,
  }: Pagination<Type>,
  enqueueSnackbar: ProviderContext['enqueueSnackbar'],
  dispatch: ReturnType<typeof useDispatch>
)
{
  dispatch(setIsLoading(true));
  const response =  await handleRequest({
      method: "get",
      url: '/type',
      params: {
        page,
        pageSize,
        filter: JSON.stringify(filter),
      }
  }, enqueueSnackbar);
  dispatch(setData(response?.data));
  dispatch(setIsLoading(false));

};










