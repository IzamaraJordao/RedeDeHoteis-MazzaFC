
export type Pagination <T> = { 
   page: number,
   pageSize: number,
   filter: Filter<T>,
   total?: number,
 }

 export type Filter <T> = {
  [key in keyof T]?: T[key];
 }
 //
