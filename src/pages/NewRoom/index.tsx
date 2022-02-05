import { push, ref, set } from 'firebase/database'
import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import illustration from '../../assets/images/illustration.svg'
import logo from '../../assets/images/logo.svg'
import { Button } from '../../components/Button'
import { useAuth } from '../../hooks/useAuth'
import { database } from '../../services/firebase'
import styles from './styles.module.scss'

export function NewRoom() {
  const [name, setName] = useState('')

  const { user } = useAuth()
  const navigate = useNavigate()

  async function handleCreateRoom(e: FormEvent) {
    e.preventDefault()

    if (name.trim() === '') {
      return
    }

    const roomsRef = ref(database, 'rooms')

    const newRoomRef = await push(roomsRef)

    set(newRoomRef, {
      title: name,
      authorId: user?.id,
    })

    navigate(`/rooms/${newRoomRef.key}`)
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
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
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
