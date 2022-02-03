import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { auth } from '../services/firebase'

type User = {
  id: string
  name: string
  avatar: string
}

interface AuthContextData {
  user: User | undefined
  signInWithGoogle: () => Promise<void>
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

interface Props {
  children: ReactNode
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        const { displayName, photoURL, uid } = user

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        })
      }
    })

    return () => unsubscribe()
  }, [])

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider()

    const result = await signInWithPopup(auth, provider)
    if (result.user) {
      const { displayName, photoURL, uid } = result.user

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      })
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}
