import toast from 'react-hot-toast'
import copy from '../../assets/images/copy.svg'
import styles from './styles.module.scss'

type Props = {
  code: string
}

export function RoomCode({ code }: Props) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code)

    toast.success('Código da sala copiado!')
  }

  return (
    <button className={styles.container} onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copy} alt="Copy room code" />
      </div>

      <span>Sala #{code}</span>
    </button>
  )
}
