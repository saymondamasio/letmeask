import { ref, remove, update } from 'firebase/database'
import { useState } from 'react'
import Modal from 'react-modal'
import { useNavigate, useParams } from 'react-router-dom'
import { ReactComponent as AnswerIcon } from '../../assets/images/answer.svg'
import { ReactComponent as CheckIcon } from '../../assets/images/check.svg'
import { ReactComponent as DeleteIcon } from '../../assets/images/delete.svg'
import { Button } from '../../components/Button'
import Header from '../../components/Header'
import { ConfirmRemoveQuestionModal } from '../../components/Modal/ConfirmRemoveQuestionModal'
import { ConfirmRemoveRoomModal } from '../../components/Modal/ConfirmRemoveRoomModal copy'
import { Question } from '../../components/Question'
import { RoomCode } from '../../components/RoomCode'
import { useRoom } from '../../hooks/useRoom'
import { database } from '../../services/firebase'
import styles from './styles.module.scss'

type Params = {
  id: string
}
Modal.setAppElement('#root')

export function AdminRoom() {
  const { id: roomId } = useParams<Params>()
  const [isOpenQuestionModal, setIsOpenQuestionModal] = useState(false)
  const [isOpenRoomModal, setIsOpenRoomModal] = useState(false)
  const navigate = useNavigate()
  const [selectedIdRemoveQuestion, setSelectedIdRemoveQuestion] = useState('')

  const { questions, title } = useRoom(String(roomId))

  async function handleCheckQuestionAsAnswered(questionId: string) {
    const questionRef = ref(database, `rooms/${roomId}/questions/${questionId}`)
    await update(questionRef, {
      isAnswered: true,
    })
  }
  async function handleHighlightQuestion(questionId: string) {
    const questionRef = ref(database, `rooms/${roomId}/questions/${questionId}`)
    await update(questionRef, {
      isHighlighted: true,
    })
  }

  async function handleRemoveQuestion(questionId: string) {
    setIsOpenQuestionModal(true)
    setSelectedIdRemoveQuestion(questionId)
  }

  async function confirmRemoveQuestionModal() {
    const questionRef = ref(
      database,
      `rooms/${roomId}/questions/${selectedIdRemoveQuestion}`
    )
    await remove(questionRef)
    setIsOpenQuestionModal(false)
  }

  async function handleEndRoom() {
    const roomRef = ref(database, `rooms/${roomId}`)

    await update(roomRef, {
      closedAt: new Date(),
    })

    navigate('/')
  }

  return (
    <div className={styles.container}>
      <Header classContainer={styles.header}>
        {roomId && <RoomCode code={roomId} />}
        <Button
          className={styles.buttonCloseRoom}
          onClick={() => setIsOpenRoomModal(true)}
          isOutlined
        >
          Encerrar sala
        </Button>

        <ConfirmRemoveRoomModal
          handleConfirm={handleEndRoom}
          isOpen={isOpenRoomModal}
          onClose={() => setIsOpenRoomModal(false)}
        />
      </Header>

      <main>
        <div className={styles.roomTitle}>
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className={styles.questionList}>
          {questions.length > 0 &&
            questions.map(question => (
              <Question
                key={question.id}
                author={question.author}
                content={question.content}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
                containerButtonsClass={styles.questionButtons}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <CheckIcon />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <AnswerIcon />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(question.id)}
                >
                  <DeleteIcon />
                </button>

                <ConfirmRemoveQuestionModal
                  handleConfirm={confirmRemoveQuestionModal}
                  isOpen={isOpenQuestionModal}
                  onClose={() => setIsOpenQuestionModal(false)}
                />
              </Question>
            ))}
        </div>
      </main>
    </div>
  )
}
