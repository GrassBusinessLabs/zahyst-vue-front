import type { User } from './user-data'

export interface CurrentUser {
   token: string
   user: User
}
