export type Request<B = any, P = any, Q = any> = {
  body: B
  params: P
  query: Q
}

export type Response<T> = Promise<{
  status: number
  body: T
}>

export type ReturnPaginate<T> = {
  result: T[]
  current: number 
  pageSize: number 
  total: number  
}

export interface UseCase <B, P, Q, T> { 
  execute (request: Request<B, P, Q>, dataToken?:any ) : Response<T>
}

////
