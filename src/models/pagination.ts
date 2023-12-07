export type Pagination<T = any> = {
   limit: number
   skip: number
   total: number
} & T
