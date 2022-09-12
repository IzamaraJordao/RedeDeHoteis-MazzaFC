export type Request<B, P = undefined, Q = undefined> = {
  body: B
  params: P
  query: Q
}

export type Response<T> = {
  status: number
  body: T
}
