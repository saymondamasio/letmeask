import { Link } from 'react-router-dom'
import illustration from '../../assets/images/illustration.svg'
import logo from '../../assets/images/logo.svg'
import { Button } from '../../components/Button'
import styles from './styles.module.scss'

export function NewRoom() {
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
          <h2>Criar uma nova sala</h2>
          <form>
            <input type="text" placeholder="Nome da sala" />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
