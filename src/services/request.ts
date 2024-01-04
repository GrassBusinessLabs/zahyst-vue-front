import {apiService} from '@/services/api'
import type {AddPostBody, CurrentUser, GetPostsResponse, LoginBody, Post,  } from '@/models'
import { Location } from '@/models/location'

export const requestService = () => {
   const api = apiService()

   async function login(body: LoginBody): Promise<CurrentUser> {
      return api.post('/auth/login', body)
   }

   async function getPosts(): Promise<GetPostsResponse> {
      return api.get('/auth/posts')
   }
   async function getLocations(pageNumber: number) {
      return api.get('/locations/my?page=' + pageNumber)
   } 
   async function createLocation(body: Location){
      return api.post('/locations', body)
   }

   async function addPost(body: AddPostBody): Promise<Post> {
      // WARNING!!! This request only simulates adding a new post
      return api.post('/auth/posts/add', body)
   }

   async function getCurrentUser(): Promise<CurrentUser> {
      // WARNING!!! In real projects, this request will look something like this api.get('/users/me')

      return login({
         email: 'email@gmail.com',
         password: 'password'
      })
   }

   async function logout(): Promise<void> {
      // WARNING!!! In real projects, this request will look something like this api.post('/logout')
   }

   return {
      login,
      getPosts,
      getCurrentUser,
      getLocations,
      createLocation,
      logout,
      addPost
   }
}
