import { onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { database } from '../services/firebase'
import { useAuth } from './useAuth'

type QuestionType = {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHighlighted: boolean
  likeCount: number
  likeId: string | undefined
}

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string
      avatar: string
    }
    content: string
    isAnswered: boolean
    isHighlighted: boolean
    likes: Record<
      string,
      {
        authorId: string
      }
    >
  }
>

export function useRoom(roomId: string) {
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [title, setTitle] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    const roomRef = ref(database, `rooms/${roomId}`)

    const unsubscribe = onValue(roomRef, data => {
      console.log('Sala atualizada')

      const firebaseQuestions: FirebaseQuestions = data.val().questions ?? {}

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => ({
          id: key,
          content: value.content,
          author: value.author,
          isAnswered: value.isAnswered,
          isHighlighted: value.isHighlighted,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(
            ([, like]) => like.authorId === user?.id
          )?.[0],
        })
      )

      setTitle(data.val().title)
      setQuestions(parsedQuestions)
    })

    return () => unsubscribe()
  }, [roomId, user])

  return {
    questions,
    title,
  }
}
