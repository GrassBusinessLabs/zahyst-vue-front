import type {Pagination} from '@/models/pagination'

export interface Post {
   id: number
   body: string
   title: string
   userId: number
   tags?: string[]
   reactions?: number
}

export type GetPostsResponse = Pagination<{posts: Post[]}>

export interface AddPostBody {
   body: string
   title: string
   userId: number
   tags?: string[]
   reactions?: number
}
