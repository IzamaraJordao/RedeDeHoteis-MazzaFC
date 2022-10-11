import  axios  from 'axios';
import { ProviderContext } from 'notistack';
import { useDispatch } from 'react-redux';
import { Hotel, setData, setIsLoading } from '../../store/hotelSlice';
import { Pagination } from '../../template/types/pagination';
import { handleRequest } from '../handleRequest';

export async function saveHotel({
    id,
    name,
    cnpj,
    address,
    phone,
    email}: any) {
    const response = await axios.post('/hotel', {
        id,
        cnpj,
        name,
        address,
        phone,
        email,
    });
    return response.data;
}

export async function hotelPaginate(
  {
    page,
    pageSize,
    filter,
  }: Pagination<Hotel>,
  enqueueSnackbar: ProviderContext['enqueueSnackbar'],
  dispatch: ReturnType<typeof useDispatch>
)
{
  dispatch(setIsLoading(true));
  const response =  await handleRequest({
      method: "get",
      url: '/hotel',
      params: {
        page,
        pageSize,
        filter: JSON.stringify(filter),
      }
  }, enqueueSnackbar);
  dispatch(setData(response?.data));
  dispatch(setIsLoading(false));

};

export async function getByIdHotel(id: number) {
    return await axios.get('/hotel/' + id );
}
export async function getByCnpjHotel(cnpj: string) {
    return await axios.get('/hotel/cnpj' + cnpj );
}


export async function hotelDelete(
  id: Hotel['id'],
 enqueueSnackbar: ProviderContext['enqueueSnackbar'],
 dispatch: ReturnType<typeof useDispatch>
){
 dispatch(setIsLoading(true));
 const response =  await handleRequest({
     method: "delete",
     url: `/hotel/${id}`,
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



export async function updateHotel(id: number) {
    return await axios.put('/hotel/' + id);
}
