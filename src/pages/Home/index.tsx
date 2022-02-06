import { child, get, ref } from 'firebase/database'
import { FormEvent, useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import googleIcon from '../../assets/images/google-icon.svg'
import illustration from '../../assets/images/illustration.svg'
import logoDark from '../../assets/images/logo-dark.svg'
import logo from '../../assets/images/logo.svg'
import { Button } from '../../components/Button'
import { AuthContext } from '../../contexts/AuthContext'
import { ThemeContext } from '../../contexts/ThemeContext'
import { database } from '../../services/firebase'
import styles from './styles.module.scss'

export function Home() {
  const navigate = useNavigate()
  const { signInWithGoogle, user } = useContext(AuthContext)
  const [roomCode, setRoomCode] = useState('')
  const { theme } = useContext(ThemeContext)

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }

    navigate('/rooms/new')
  }

  async function handleJoinRoom(e: FormEvent) {
    e.preventDefault()

    if (roomCode.trim() === '') {
      return
    }

    const databaseRef = ref(database)

    const roomRef = await get(child(databaseRef, `rooms/${roomCode}`))

    if (!roomRef.exists()) {
      toast.error('Sala não encontrada')
      return
    }

    if (roomRef.val().closedAt) {
      toast.error('Sala foi fechada')
      return
    }

    navigate(`/rooms/${roomCode}`)
  }

  return (
    <div className={styles.container}>
      <aside>
        <img
          src={illustration}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as duvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className={styles.mainContent}>
          {theme === 'dark' ? (
            <img src={logoDark} alt="Letmeask" />
          ) : (
            <img src={logo} alt="Letmeask" />
          )}
          <button
            onClick={handleCreateRoom}
            className={styles.createRoom}
            type="button"
          >
            <img src={googleIcon} alt="Login com Google" />
            Crie sua sala com o Google
          </button>
          <div className={styles.separator}>ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              value={roomCode}
              onChange={e => setRoomCode(e.target.value)}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}
