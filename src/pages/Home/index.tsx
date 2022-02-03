import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import googleIcon from '../../assets/images/google-icon.svg'
import illustration from '../../assets/images/illustration.svg'
import logo from '../../assets/images/logo.svg'
import { Button } from '../../components/Button'
import { AuthContext } from '../../contexts/AuthContext'
import styles from './styles.module.scss'

export function Home() {
  const navigate = useNavigate()
  const { signInWithGoogle, user } = useContext(AuthContext)

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }

    navigate('/rooms/new')
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
          <img src={logo} alt="Letmeask" />
          <button
            onClick={handleCreateRoom}
            className={styles.createRoom}
            type="button"
          >
            <img src={googleIcon} alt="Login com Google" />
            Crie sua sala com o Google
          </button>
          <div className={styles.separator}>ou entre em uma sala</div>
          <form>
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}
