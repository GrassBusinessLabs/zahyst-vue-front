import localforage from 'localforage'

import type {LocalForage} from '@/models'
import {APP_NAME} from '@/constants'

export const appStorageService = () => {
   const storage: LocalForage = localforage as any

   const instance: LocalForage = storage.createInstance({
      driver: storage.LOCALSTORAGE,
      name: APP_NAME
   })

   async function length(): Promise<number> {
      return instance.length()
   }

   async function get<T = any>(key: string): Promise<T | null> {
      return instance.getItem<T>(key)
   }

   async function set<T = any>(key: string, value: T): Promise<T> {
      return instance.setItem(key, value)
   }

   async function remove(key: string): Promise<void> {
      return instance.removeItem(key)
   }

   async function clear(): Promise<void> {
      return instance.clear()
   }

   async function key(keyIndex: number): Promise<string> {
      return instance.key(keyIndex)
   }

   async function keys(): Promise<string[]> {
      return instance.keys()
   }

   async function removeAll(...keys: string[]) {
      for (const key of keys) {
         await remove(key)
      }
   }

   async function clearExcept(...keys: string[]) {
      const logs: {key: string, value: unknown}[] = []

      for (const key of keys) {
         const value: unknown = await get(key)
         if (key && value) {
            logs.push({key, value})
         }
      }

      await clear()

      for (const log of logs) {
         if (log.key && log.value) {
            await set(log.key, log.value)
         }
      }
   }

   return {
      length,
      get,
      set,
      remove,
      clear,
      key,
      keys,
      removeAll,
      clearExcept
   }
}
