import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type Response<T> = [T, Dispatch<SetStateAction<T>>]

export function usePersistedState<T>(
  key: string,
  initialState: T
): Response<T> {
  const [state, setState] = useState<T>(() => {
    const storage = localStorage.getItem(key)
    return storage ? JSON.parse(storage) : initialState
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [state, key])

  return [state, setState]
}
