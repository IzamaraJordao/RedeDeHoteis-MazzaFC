


import {api} from './api'

export type HandleRequest = {
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: any,
  params?: any,

}


export async function handleRequest({ method, url, data, params } : HandleRequest  ,  enqueueSnackbar: any)  {
 
  let response
  try {
    response = await api.request({
      method: method,
      url,
      data,
      params,
      headers:{
        'Content-Type': 'application/json',
        //@ts-ignore
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })


  } catch (error: any) {
    console.log("teste", error)
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
