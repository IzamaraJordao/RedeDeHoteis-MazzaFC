import axios from 'axios'
export type HandleRequest = {
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: any,
  params?: any,
}
export async function handleRequest({ method, url, data, params } : HandleRequest  ,  enqueueSnackbar: any)  {
  const api = axios.create({
    url: process.env.NEXT_PUBLIC_API // http://localhost:3000/
  })
  let response
  try {
    response = await api.request({
      method: method,
      url,
      data,
      params
    })


  } catch (error: any) {
    if (error && error.response && error.response.status < 500) {
      // const message = error.response.
      enqueueSnackbar(error.response.data, {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        },
        variant: 'error'
      })
      return
    } // mostra a mensagem de erro retornada do backend

    enqueueSnackbar(
      'Houve um problema com a solicitação. Tente novamente, mais tarde.',
      {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        },
        variant: 'error'
      }
    ) // mostra a mensagem de erro generica
    return
  }
  return response
}
