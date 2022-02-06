import { push, ref, remove } from 'firebase/database'
import { FormEvent, useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useParams } from 'react-router-dom'
import avatar from '../../assets/images/avatar.svg'
import { ReactComponent as Like } from '../../assets/images/like.svg'
import logoDark from '../../assets/images/logo-dark.svg'
import logo from '../../assets/images/logo.svg'
import { Button } from '../../components/Button'
import { Question } from '../../components/Question'
import { RoomCode } from '../../components/RoomCode'
import { ThemeSwitcher } from '../../components/ThemeSwither'
import { ThemeContext } from '../../contexts/ThemeContext'
import { useAuth } from '../../hooks/useAuth'
import { useRoom } from '../../hooks/useRoom'
import { database } from '../../services/firebase'
import styles from './styles.module.scss'

type Params = {
  id: string
}

export function Room() {
  const { id: roomId } = useParams<Params>()
  const [newQuestion, setNewQuestion] = useState('')
  const { theme } = useContext(ThemeContext)
  const { user } = useAuth()

  const { questions, title } = useRoom(String(roomId))

  async function handleSendQuestion(e: FormEvent) {
    e.preventDefault()

    if (newQuestion.trim() === '') {
      return
    }

    if (!user) {
      return toast.error('You must be logged in.')
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    }

    const refQuestions = ref(database, `rooms/${roomId}/questions`)
    await push(refQuestions, question)
    setNewQuestion('')

    toast.success('Question sent.')
  }

  async function handleLikeQuestion(
    questionId: string,
    likeId: string | undefined
  ) {
    if (likeId) {
      const likeRef = ref(
        database,
        `rooms/${roomId}/questions/${questionId}/likes/${likeId}`
      )

      await remove(likeRef)
    } else {
      const likesRef = ref(
        database,
        `rooms/${roomId}/questions/${questionId}/likes`
      )
      await push(likesRef, {
        authorId: user?.id,
      })
    }
  }

  return (
    <div className={styles.container}>
      <header>
        <div className={styles.content}>
          <Link to="/">
            {theme === 'dark' ? (
              <img src={logoDark} alt="Letmeask" />
            ) : (
              <img src={logo} alt="Letmeask" />
            )}
          </Link>
          <div>
            <ThemeSwitcher />

            {roomId && <RoomCode code={roomId} />}
          </div>
        </div>
      </header>

      <main>
        <div className={styles.roomTitle}>
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você acha quer perguntar?"
            onChange={e => setNewQuestion(e.target.value)}
            value={newQuestion}
          />

          <div className={styles.formFooter}>
            {user ? (
              <div className={styles.userInfo}>
                <img
                  src={user.avatar}
                  alt={user.name}
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
                    (e.currentTarget.src = avatar)
                  }
                />

                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta faça,
                <button type="button">seu login.</button>
              </span>
            )}
            <Button type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </div>
        </form>

        <div className={styles.questionList}>
          {questions.length > 0 &&
            questions.map(question => (
              <Question
                key={question.id}
                author={question.author}
                content={question.content}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <button
                    aria-label="Marcar com gostei"
                    className={`${styles.likeButton} ${
                      question.likeId ? styles.liked : ''
                    }`}
                    type="button"
                    onClick={() =>
                      handleLikeQuestion(question.id, question.likeId)
                    }
                  >
                    {question.likeCount > 0 && (
                      <span>{question.likeCount}</span>
                    )}
                    <Like />
                  </button>
                )}
              </Question>
            ))}
        </div>
      </main>
    </div>
  )
}
