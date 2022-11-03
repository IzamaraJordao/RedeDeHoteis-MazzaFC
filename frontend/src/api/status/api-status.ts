import { handleRequest } from "../handleRequest";
import {ProviderContext} from 'notistack';
import { useDispatch } from "react-redux";
import { Status,  setIsLoading, setData } from "../../store/statusSlice";
import { Pagination } from "../../template/types/pagination";


export async function statusPaginate(
  {
    page,
    pageSize,
    filter,
  }: Pagination<Status>,
  enqueueSnackbar: ProviderContext['enqueueSnackbar'],
  dispatch: ReturnType<typeof useDispatch>
)
{
  dispatch(setIsLoading(true));
  const response =  await handleRequest({
      method: "get",
      url: '/status',
      params: {
        page,
        pageSize,
        filter: JSON.stringify(filter),
      }
  }, enqueueSnackbar);
  dispatch(setData(response?.data));
  dispatch(setIsLoading(false));
};










